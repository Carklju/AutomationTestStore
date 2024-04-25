import { Page, expect } from '@playwright/test'
import fs from 'fs'

export class AddToCartPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async addProductToCart(productTitle: string, sectionTitle: string, quantityClick: number){
        //read sections.json file where are ids for all sections
        let sectionsJSON = fs.readFileSync('/Users/ivicamacbook/Desktop/ALEKSA/AutomationTestStore/AutomationTestStoreInternship/data/sections.json', 'utf-8')
        //parse it into sections variable
        let sections = JSON.parse(sectionsJSON)
        //loop thourgh sections
        for(let section in sections){
            //if section in sections.json matches sectionTitle provided in function parameter
            if(section === sectionTitle){
                //scroll to the section
                await this.page.locator(`${sections[section]}`).scrollIntoViewIfNeeded()
                //call writeData function to get div text
                let element = await this.writeData(sectionTitle, productTitle)
                //hover over certain product 
                for(let i = 0; i < quantityClick; i++){
                    await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag > a`).click()
                }
                const addedToCart = this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > .pricetag > .quick_basket`).getByTitle('Added to cart')
                //await addedToCart.scrollIntoViewIfNeeded()
                await addedToCart.click()
            }
        }
    }

    async writeData(sectionTitle: string, productTitle: string){
        //create string array that consists out of products in certain section
        let productArray = (await this.page.locator(`#${sectionTitle} .prdocutname`).allTextContents())
        //find element that matches productTitle 
        const elements = (element:string) => element === productTitle
        //find what is the index of that element in array
        const nthValue = productArray.findIndex(elements)
        //create string where nth-value if index of that element + 1
        const divText = `div:nth-child(${nthValue + 1})`
        //return that string
        return divText
    }
}