import { Page, expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.describe('review', () => {
    let pm:any

    test.beforeEach( async ({page}) =>{
        pm = new PageManager(page)
        //Go to Automation Test Store Website
        await page.goto('https://automationteststore.com/')
    })

    test('add review to a product in special section', async({page}) =>{
       await pm.productsPage().selectProductFromSection("Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15","latest")
       const value = await pm.productsPage().fillWriteReview('3')
       const nameText = await pm.productsPage().getName()
       const reviewText = await pm.productsPage().getReview()
       const alertText = await pm.productsPage().getAlertHumanVerification()
       await expect(nameText).toHaveText(value.first)
       await expect(reviewText).toContainText(value.second)
       await expect(alertText).toHaveText(alertText)
    })
})
