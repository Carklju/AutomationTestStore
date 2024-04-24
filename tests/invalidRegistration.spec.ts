import { Page, expect, test } from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"


test.describe('registration', () =>{
    let pm:any
    test.beforeEach( async({page}) =>{
        //Instance of Page Manager Class
        pm = new PageManager(page)
        //Go to Automation Test Store Website
        await page.goto('https://automationteststore.com/')
        //Click on the Login/register in navigation bar
        await pm.navigateTo().RegisterPage()
        //Assert that URL is correct
        await expect(page).toHaveURL('https://automationteststore.com/index.php?rt=account/create')
    })

    test('user registration with unfilled ZIP CODE', async({page}) => {
        //Register using custom values
        await pm.loginAndRegister().RegisterWithEmptyOrModifiedFields("Test", "Test", "test12312412@test.com", "Test", "Test", "", "TeestAleksa", "test", "test")
        const alertText =  await pm.loginAndRegister().getAlertText()
        //Assert that in alert box it displays right text
        expect(alertText?.replace('×', '')).toContain('Zip/postal code must be between 3 and 10 characters!')
        const alertHelpBlock = await pm.loginAndRegister().getAlertHelpBlock()
        //Assert that below ZIP Code input is displayed error message
        expect(alertHelpBlock).toContain('Zip/postal code must be between 3 and 10 characters!')
    })
})
