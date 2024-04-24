import { Page } from '@playwright/test'
import { faker } from '@faker-js/faker'
import fs from 'fs'

export class ProductPage{

    private readonly page:Page
    
    constructor(page: Page){
        this.page = page
    }

    async selectProductFromSection(productTitle: any, sectionTitle: string){
        let sectionsJSON = fs.readFileSync('/Users/ivicamacbook/Desktop/ALEKSA/AutomationTestStore/AutomationTestStoreInternship/data/sections.json', 'utf-8')
        let sections = JSON.parse(sectionsJSON)
        for(let section in sections){
            if(section === sectionTitle){
                const special = await this.page.locator(`${sections[section]}`).scrollIntoViewIfNeeded()
                let element = await this.writeData(sectionTitle, productTitle)
                await this.page.locator(`${sections[section]} > .thumbnails > ${element} > .thumbnail > a`).hover()
                await this.page.getByRole('link', { name: 'Write Review' }).click()
            }
        }
    }

    async writeData(sectionTitle:string, productTitle: string){
        let productArray = (await this.page.locator(`#${sectionTitle} .prdocutname`).allTextContents())
        const elements = (element:string) => element === productTitle
        const nthValue = productArray.findIndex(elements)
        const divText = `div:nth-child(${nthValue + 1})`
        return divText
    }

    async fillWriteReview(stars: string){
        //await this.page.locator(`.star-rating rater-0 star star-rating-applied star-rating-live #rating${stars}`).click()
        await this.page.locator('a').getByText(stars).first().click()
        await this.page.locator('#name').fill(faker.person.fullName())
        await this.page.locator('#text').fill(faker.lorem.words(50))
        await this.page.getByRole('button', {name: " Submit"}).click()
    }
}