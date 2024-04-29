import { Page } from '@playwright/test'
import fs from 'fs'
import { ProductPage } from './productPage'
export class AddToCartPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Function that find certain product on home page and adds it to cart given times
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
                //Call write data function
                let element = await productPage.writeData(sectionTitle, productTitle)
                //Click on the add to cart given nubmer of times
                const link = this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag > a`)
                //If Add to cart have href attribute
                if(await link.getAttribute('href') !== '#'){
                    //Get price for that product
                    await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag > .price > .oneprice`).textContent()
                    //Click on Add to cart
                    await link.click()
                    //Fill input filed with quantity
                    await this.page.locator('#product_quantity').fill(quantityClick.toString())
                    //Click on Add to cart in product card
                    await this.page.locator('a.cart').click()
                    //Call getValuesFromCheckoutTable function
                    const haveHrefValuesFromTable = await this.getValuesFromCheckoutTable(productTitle)
                    return{
                        totalPriceText: haveHrefValuesFromTable?.totalPriceText,
                        totalPrice: haveHrefValuesFromTable?.totalPrice
                    }
                //If Add to cart doesn't have href  
                }else if (await link.getAttribute('href') === '#'){
                    //Click on the quantity given number of times
                    for(let i = 0; i < quantityClick; i++){
                        //Click on add to cart
                        await link.click()
                    }
                    //Click on Add to cart
                    const addedToCart = this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag.added_to_cart > .quick_basket > a`).last()
                    //Click on added to cart
                    await addedToCart.click()
                    //Call getValuesFromCheckoutTable function
                    let noHrefValuesFromTable = await this.getValuesFromCheckoutTable(productTitle)
                    // console.log('Funkcija: ', noHrefValuesFromTable?.totalPriceText)
                    // console.log('Funkcija: ', noHrefValuesFromTable?.totalPrice)
                    return{
                        totalPriceText: noHrefValuesFromTable?.totalPriceText,
                        totalPrice: noHrefValuesFromTable?.totalPrice
                    }
                }
            }
        } 
    }

    /**
     * Function that gets sub-total price and flat shipping rate format them, summarize
     * @returns total price locator and total price text
     */
    async getTotalPrice(){
        //Sub total text
        const subTotal:any = await this.page.locator('#totals_table > tbody > tr > td').nth(1).locator('span').textContent()
        //Formatted sub total text
        const subTotalFormatted = subTotal?.replace(/^(-)|[^0-9.,]+/g, '')
        //Flat shipping rate text
        const flatShippingRate:any = await this.page.locator('#totals_table > tbody > tr > td').nth(3).locator('span').textContent()
        //Formatted flat shipping rate text
        const flatShippingRateFormatted = flatShippingRate?.replace(/^(-)|[^0-9.,]+/g, '')
        //Total price locator
        const totalPrice  = this.page.locator('#totals_table > tbody > tr > td').nth(5)
        //Total price text
        const total: any = await totalPrice.locator('span').textContent()
        //Total price text formatted
        const totalPriceFormatted = total?.replace(/^(-)|[^0-9.,]+/g, '')
        //Create string from subtotal + flat shipping rate function
        const totalText = `$${(parseFloat(subTotalFormatted) + parseFloat(flatShippingRateFormatted)).toFixed(2)}`
        //If subtotal + flat shipping rate equal total price return total price locator and total price text
        if(parseFloat(subTotalFormatted) + parseFloat(flatShippingRateFormatted) === parseFloat(totalPriceFormatted)){
            return {
                totalLocator: totalPrice,  
                totalText: totalText
            }
        }
    }

    /**
     * Function that get all values from all rows in checkout table and if product title from array matches product title in parameter return
     * @param productTitle - Product title same as in addProductToCart function
     * @returns Total price text from table and total price got from quantity * price per unit
     */
    async getValuesFromCheckoutTable(productTitle: string){
        await this.page.waitForURL('https://automationteststore.com/index.php?rt=checkout/cart')
        //Locator for all rows in checkout table
        let row = this.page.locator('.table.table-striped.table-bordered tbody').locator('tr')
        //Get count of rows
        let rowCount = await row.count()
        //New empty array for product information array
        let productArray = new Array()
        //New empty array for qunatity input value
        let quantity = new Array()
        //Loop through all rows and take all table cell inner texts and input values and push them in their arrays
        for(let i = 1; i < rowCount - 1 ; i++){
            let data = await row.nth(i).locator('td').allInnerTexts()
            let quantityValue = await row.nth(i).getByRole('cell').locator('div > input.form-control.short').inputValue()
            productArray.push(data)
            quantity.push(quantityValue)
        }
        //Loop through product array and if title from array matches product title from parameters return subtotal price from table and subtotal price got from quantity * price per unit
        for(let i = 0; i < productArray.length; i++){
            if(productArray[i][1] === productTitle){
                //Format price per unit
                let priceUnit = productArray[i][3].replace(/^(-)|[^0-9.,]+/g, '')
                //Get subtotal price
                let subTotalPrice = (parseFloat(priceUnit) * parseFloat(quantity[i])).toFixed(2)
                return {
                    totalPriceText: productArray[i][5],
                    totalPrice: `$${subTotalPrice}`
                }
            }
        }
    }
}
