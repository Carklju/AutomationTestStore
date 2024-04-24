import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import fs from 'fs'
export class ProductPage{

    private readonly page:Page
    
    constructor(page: Page){
        this.page = page
    }

    /**
     * Function that hovers product that we type in parameters hover over it and click on review
     * @param productTitle - product title
     * @param sectionTitle - section title
     */
    async selectProductFromSection(productTitle: any, sectionTitle: string){
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
                await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > a`).hover()
                //click on write review link
                await this.page.getByRole('link', { name: 'Write Review' }).click()
            }
        }
    }
    /**
     * Function that returns div:nth-child value for product in a section
     * @param sectionTitle - section title same as in selectProductFromSection function
     * @param productTitle - pruduct title same as in selectProductFromSection function
     * @returns - divText string with exact div:nth-child value for certain product
     */
    async writeData(sectionTitle:string, productTitle: string){
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
    /**
     * Function that fills review form
     * @param stars - number of stars for review
     */
    async fillWriteReview(stars: string){
        //Select star based on number of stars provided in paramethers
        await this.page.locator('a').getByText(stars).first().click()
        //fill name input with random fullName from faker.js
        const fullName = faker.person.fullName()
        await this.page.locator('#name').fill(fullName)
        //fill review input with random lorem text from faker.js
        const reviewText = faker.lorem.words(50)
        await this.page.locator('#text').fill(reviewText)
        //click on the submit button
        await this.page.getByRole('button', {name: " Submit"}).click()
        //return object with name and review keys with fullName and reviewText values
        return {
            name: fullName,
            review: reviewText
        }
    }
    //Get star locator
    async getStars(stars: string){
        return this.page.locator('a').getByText(stars)
    }
    //Get locator for name input field
    async getName(){
        return this.page.locator('#name')
    }
    //Get locator for review input field
    async getReview(){
        return this.page.locator('#text')
    }
    //Get locator for error message
    async getAlertHumanVerification(){
        return this.page.getByText('Human verification has failed! Please try again.')
    }
}
