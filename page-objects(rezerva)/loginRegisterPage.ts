import { Page, expect } from '@playwright/test'
import { HelperBase } from '../page-objects/helperBase';

export class LoginAndRegisterPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async RegisterWithAllCredentialsAndChecks(){
        //Entering all credentials
        await this.page.locator('#AccountFrm_firstname').fill('Aleksa')
        await this.page.locator('#AccountFrm_lastname').fill('Kljucar')
        await this.page.locator('#AccountFrm_email').fill('aleksa.kljucar@gmail.com')
        await this.page.locator('#AccountFrm_telephone').fill('0601231234')
        await this.page.locator('#AccountFrm_fax').fill('234567')
        await this.page.locator('#AccountFrm_company').fill('Company')
        await this.page.locator('#AccountFrm_address_1').fill('Address123')
        await this.page.locator('#AccountFrm_address_2').fill('Address123')
        await this.page.locator('#AccountFrm_city').fill('Novi Sad')
        const countryDropdown = this.page.locator('#AccountFrm_country_id')
        await countryDropdown.selectOption({label: 'Yugoslavia'})
        const regionDropdown = this.page.locator('#AccountFrm_zone_id')
        await regionDropdown.click()
        await regionDropdown.selectOption({label: 'Vojvodina'})
        await this.page.locator('#AccountFrm_postcode').fill('12345')
        await this.page.locator('#AccountFrm_loginname').fill('Aleksa')
        await this.page.locator('#AccountFrm_password').fill('1234')
        await this.page.locator('#AccountFrm_confirm').fill('1234')
        //Click on privacy policy checkbox
        const privacyPolicy = this.page.locator('#AccountFrm_agree')
        await privacyPolicy.click()
        //Click on register button
        await this.page.getByTitle('Continue').click()
        //Assert Welcome back in nav bar
        //await expect(this.page.locator('#customer_menu_top li a div').first()).toHaveText(`Welcome back Aleksa`)
    }
}