import { expect, test } from '@playwright/test'
import { PageManager } from "../page-objects/pageManager"

test.describe('add product to cart', () => {
    let pm: any

    test.beforeEach( async({page}) => {
         //Instance of Page Manager Class
         pm = new PageManager(page)
         //Go to Automation Test Store Website
         await page.goto('https://automationteststore.com/')
         //Click on the Login/register in navigation bar
         await pm.navigateTo().RegisterPage()
         //Register using all valid credentials
        await pm.loginAndRegister().RegisterWithAllCredentialsAndChecks()
    })

    
})

