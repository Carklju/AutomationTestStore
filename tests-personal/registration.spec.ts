import { Page, test, expect } from '@playwright/test'
import {PageManager} from "../page-objects(rezerva)/pageManager"

test.describe('registration', () =>{
    test.beforeEach( async({page}) =>{
        //Instance of Page Manager Class
        const pm = new PageManager(page)
        //Go to Automation Test Store Website
        await page.goto('https://automationteststore.com/')
        //Click on the Login/register in navigation bar
        await pm.navigateTo().clickOnRegistration()
        //Assert that URL is correct
        await expect(page).toHaveURL('https://automationteststore.com/index.php?rt=account/create')
    })
    
    test('register using valid credentials', async({page}) =>{
        const pm = new PageManager(page)
        //await pm.navigateTo().LoginAndRegisterPage()
        await pm.loginAndRegister().RegisterWithAllCredentialsAndChecks()
        //Assert that account has been successfully created
        await expect(page.getByText(' Your Account Has Been Created!')).toHaveText(' Your Account Has Been Created!')
    })
})