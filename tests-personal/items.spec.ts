import { Page, expect, test } from "@playwright/test"
import {PageManager} from "../page-objects/pageManager"
import { LoginAndRegisterPage } from "../page-objects/loginAndRegisterPage"

test('', async({page}) =>{
    await page.goto('https://automationteststore.com/')
    const log = new LoginAndRegisterPage(page)
    const pm = new PageManager(page)
   // await pm.navigateTo().LoginAndRegisterPage()
    await log.RegisterWithAllCredentialsAndChecks()
})