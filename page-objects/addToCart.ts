import { Page } from '@playwright/test'
import fs from 'fs'
import { ProductPage } from './productPage'
export class AddToCartPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Function that find certain product and adds it to cart given times
     * @param productTitle - title of the section
     * @param sectionTitle - title of the section
     * @param quantityClick - number of times to add in cart
     */
    async addProductToCart(productTitle: string, sectionTitle: string, quantityClick: number){
        //read sections.json file where are ids for all sections
        let sectionsJSON = fs.readFileSync('data/sections.json', 'utf-8')
        //parse it into sections variable
        let sections = JSON.parse(sectionsJSON)
        //loop thourgh sections
        for(let section in sections){
            //if section in sections.json matches sectionTitle provided in function parameter
            if(section === sectionTitle){
                //scroll to the section
                await this.page.locator(`${sections[section]}`).scrollIntoViewIfNeeded()
                //call writeData function to get div text
                const productPage = new ProductPage(this.page)
                //let element = await this.writeData(sectionTitle, productTitle)
                let element = await productPage.writeData(sectionTitle, productTitle)
                //Click on the add to cart given nubmer of times
                for(let i = 0; i < quantityClick; i++){
                    //click on add to cart
                    await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag > a`).click()
                }
                //get price for that product
                const unitPrice: any = await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag.added_to_cart > .price > .oneprice`).textContent()
                //Price formatted
                const unitPriceFormatted: any = parseFloat(unitPrice?.replace(/^(-)|[^0-9.,]+/g, '')).toFixed(2)
                //Locator for Added to Cart
                const addedToCart = this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag.added_to_cart > .quick_basket > a`).last()
                //Click on added to cart
                await addedToCart.click()
                //Get price * quantity (total price)
                const priceMultiplied = await this.checkPriceCalculation(quantityClick, unitPriceFormatted)
                const priceUnitTable = await this.page.locator('tr > td.align_right').getByText(`$${unitPriceFormatted}`).textContent()
                const quantityTable = parseInt(await this.page.locator(`tr > td > div > input[value="${quantityClick}"]`).inputValue())
                if(priceUnitTable === unitPrice && quantityTable === quantityClick){
                    const totalPriceTable = this.page.locator('tr > td.align_right').getByText(`$${priceMultiplied}`)
                    return totalPriceTable
                }

            }
        }
       
    }

    /**
     * Function that checks if calculation of Sub-total and total is good
     * @returns true if calculation is good and bad if calculation is bad
     */
    async checkPriceCalculation(quantity: number, unitPriceFormatted: any){
        const price = quantity * unitPriceFormatted
        return price.toFixed(2)
    }

    async getTotalPriceAPI(){
        const responsePrice = await this.page.waitForResponse('https://automationteststore.com/index.php?rt=r/checkout/cart/recalc_totals')
        const responsePriceBody = await responsePrice.json()

        const subTotalPriceAPI = responsePriceBody.totals[0].value
        const shippingPriceAPI = responsePriceBody.totals[1].value
        const totalPriceAPI = responsePriceBody.totals[2].value

        const subTotalPriceAPIText = responsePriceBody.totals[0].text
        const shippingPriceAPIText = responsePriceBody.totals[1].text
        const totalPriceAPIText = responsePriceBody.totals[2].text

    }

    async getTotalPrice(){
        const subTotal:any = await this.page.locator('#totals_table > tbody > tr > td').nth(1).locator('span').textContent()
        const subTotalFormatted = parseFloat(subTotal?.replace(/^(-)|[^0-9.,]+/g, '')).toFixed(2)
        const flatShippingRate:any = await this.page.locator('#totals_table > tbody > tr > td').nth(3).locator('span').textContent()
        const flatShippingRateFormatted = parseFloat(flatShippingRate?.replace(/^(-)|[^0-9.,]+/g, '')).toFixed(2)
        const totalPrice  = this.page.locator('#totals_table > tbody > tr > td').nth(5)
        const total: any = await totalPrice.locator('span').textContent()
        const totalPriceFormatted = parseFloat(total?.replace(/^(-)|[^0-9.,]+/g, '')).toFixed(2)
        if(subTotalFormatted + flatShippingRateFormatted === totalPriceFormatted){
            return totalPrice
        }
    }
}
