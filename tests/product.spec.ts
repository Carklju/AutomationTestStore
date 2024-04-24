import { Page, expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'


puppeteer
  .use(StealthPlugin())
  .launch({ headless: true })
  .then(async browser => {})

test.describe('review', () => {
    let pm:any

    test.beforeEach( async ({page}) =>{
        pm = new PageManager(page)
        //Go to Automation Test Store Website
        await page.goto('https://automationteststore.com/')
    })

    test('add review to a product in special section', async({page}) =>{
       await pm.productsPage().selectProductFromSection("Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15","latest")
       //await page.waitForTimeout(1000)
       await pm.productsPage().fillWriteReview('3')
    })
})
