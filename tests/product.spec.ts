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
        await pm.productsPage().selectProductFromSection("Specials", "Acqua Di Gio Pour Homme")
    })
})