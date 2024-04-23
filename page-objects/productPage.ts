import { Page, expect } from '@playwright/test'

export class ProductPage{

    private readonly page:Page
    
    constructor(page: Page){
        this.page = page
    }

    async selectProductFromSection(sectionTitle: string, productTitle: string){
        //const sectionText = this.page.locator('.main-container section').getAttribute('id')
        const data = 
            {
                "Featured": "featured",
                "Latest Products": "latest",
                "Bestsellers": "bestseller",
                "Specials": "special"
            }
    
        for(let section in data){
            if(section === sectionTitle){
                const element = this.page.getByTitle(productTitle)
                await element.scrollIntoViewIfNeeded()
                const link = await element.getAttribute('href')
                const linkReview = this.page.locator(`[href="${link}/#review"]`)
                const parentElement = this.page.locator('.fixed', {
                    has: element}).locator('.fixed-wrapper').locator('.thumbnail')
                await parentElement.hover()
                await this.page.waitForTimeout(10000)
                // await this.page.waitForSelector('.shortlinks[style="display: block;"]', {state: 'visible'})
                // await this.page.getByRole('link', {name: `${link}/#review`}).click()
                
                //const parentElement = this.page.locator('.fixed').filter({has: element })
                
                
                
            }
        }
    }


}