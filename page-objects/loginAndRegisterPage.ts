import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase';
import { faker } from '@faker-js/faker';
import { count } from 'console';
import fs from 'fs'
import { json } from 'stream/consumers';

export class LoginAndRegisterPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    /**
     * * Function that registers user with radnom valid credential and choose weather to include some fileds or not
     * @param firstName - change to false in test if you want to exclude that value from test
     * @param lastName - change to false in test if you want to exclude that value from test
     * @param email - change to false in test if you want to exclude that value from test
     * @param company - change to false in test if you want to exclude that value from test
     * @param addressPrimary - change to false in test if you want to exclude that value from test
     * @param city - change to false in test if you want to exclude that value from test
     * @param zipCode - change to false in test if you want to exclude that value from test
     * @param loginName - change to false in test if you want to exclude that value from test
     * @param password - change to false in test if you want to exclude that value from test
     * @param passwordConfirm - change to false in test if you want to exclude that value from test
     */
    async RegisterWithAllCredentialsAndChecks(){
        //Calling create random user function 
        const user = await this.createRandomUser()
        //Entering all credentials
        await this.page.locator('#AccountFrm_firstname').fill(user[0].firstName)
        await this.page.locator('#AccountFrm_lastname').fill(user[0].lastName)
        await this.page.locator('#AccountFrm_email').fill(user[0].email)
        await this.page.locator('#AccountFrm_telephone').fill(user[0].telephone)
        await this.page.locator('#AccountFrm_fax').fill(user[0].fax)
        await this.page.locator('#AccountFrm_company').fill(user[0].company)
        await this.page.locator('#AccountFrm_address_1').fill(user[0].addressPrimary)
        await this.page.locator('#AccountFrm_address_2').fill(user[0].addressSecondary)
        await this.page.locator('#AccountFrm_city').fill(user[0].city)
        await this.page.locator('#AccountFrm_postcode').fill(user[0].zipCode)
        await this.page.locator('#AccountFrm_loginname').fill(user[0].loginName)
        await this.page.locator('#AccountFrm_password').fill(user[0].password)
        await this.page.locator('#AccountFrm_confirm').fill(user[0].passwordConfirm)
        //Click on privacy policy checkbox
        const privacyPolicy = this.page.locator('#AccountFrm_agree')
        await privacyPolicy.click()
        //Click on register button
        await this.page.getByTitle('Continue').click()
        //Assert Welcome back in nav bar
        await expect(this.page.locator('#customer_menu_top li a div').first()).toHaveText(`Welcome back ${user[0].firstName}`)
    }

    /**
     * Function which fills input fields however we want
     * @param firstName 
     * @param lastName 
     * @param email 
     * @param company 
     * @param addressPrimary 
     * @param city 
     * @param zipCode 
     * @param loginName 
     * @param password 
     * @param passwordConfirm 
     */
    async RegisterWithEmptyOrModifiedFields(firstName: string, lastName: string, email: string, company: string, addressPrimary: string, city: string, zipCode: string, loginName: string, password: string, passwordConfirm: string){
        if(firstName !== undefined){
            await this.page.locator('#AccountFrm_firstname').fill(firstName)
        }
        if(lastName !== undefined){
            await this.page.locator('#AccountFrm_lastname').fill(lastName)
        }
        if(email !== undefined){
            await this.page.locator('#AccountFrm_email').fill(email)
        }
        if(company !== undefined){
            await this.page.locator('#AccountFrm_company').fill(company)
        }
        if(addressPrimary !== undefined){
            await this.page.locator('#AccountFrm_address_1').fill(addressPrimary)
        }
        if(city !== undefined){
            await this.page.locator('#AccountFrm_city').fill(city)
        }
        if(zipCode !== undefined){
            await this.page.locator('#AccountFrm_postcode').fill(zipCode)
        }
        if(loginName !== undefined){
            await this.page.locator('#AccountFrm_loginname').fill(loginName)
        }
        if(password !== undefined){
            await this.page.locator('#AccountFrm_password').fill(password)
        }
        if(passwordConfirm !== undefined){
            await this.page.locator('#AccountFrm_confirm').fill(passwordConfirm)
        }
        //Click on privacy policy checkbox
        const privacyPolicy = this.page.locator('#AccountFrm_agree')
        await privacyPolicy.click()
        //Click on register button
        await this.page.getByTitle('Continue').click()
    }

    /**
     * * Function that returns user with random valid credentials
     */
    private async createRandomUser(){
        // ! FAKER CLASS
        //Create random First Name
        const randomFirstName = faker.person.firstName()
        //Create random Last Name
        const randomLastName = faker.person.lastName()
        //Create random email using js library
        const randomEmail = `${randomFirstName.replace(' ', '')}${faker.number.int(1000)}@test.com`
        //Create random Telephone
        const randomTelephone = faker.phone.number()
        //Create random Fax
        const randomFax = faker.phone.number()
        //Create random company
        const randomCompany = faker.company.name()
        //Create random primary address
        const randomAddressPrimary = faker.location.streetAddress()
        //Create random secondary address
        const randomAddressSecondary = faker.location.secondaryAddress()
        //Create random City
        const randomCity = faker.location.city()
        //------------------------------------------------------------------------------------------------------------------------
        //Select Region
        const regionDropdown = this.page.locator('#AccountFrm_zone_id')
        await regionDropdown.click()
        const regionOption = await regionDropdown.selectOption({label: 'Angus'})
        //Create random ZIPCode
        const randomZIPCode = faker.number.int({max: 9999999999})
        //Create random login name 
        const randomLoginName = faker.internet.userName()
        //Create random password
        const randomPassword = faker.internet.password()
        //Confirm password is same as the password
        const randomPasswordConfirm = randomPassword
        //Creating user 
        let user =
        [
            {
                firstName: randomFirstName,
                lastName: randomLastName,
                email: randomEmail,
                telephone: randomTelephone,
                fax: randomFax,
                company: randomCompany,
                addressPrimary: randomAddressPrimary,
                addressSecondary: randomAddressSecondary,
                city: randomCity,
                country: 'United Kingdom',
                region: 'Angus',
                zipCode: randomZIPCode.toString(),
                loginName: randomLoginName,
                password: randomPassword,
                passwordConfirm: randomPasswordConfirm
            }
        ] 
    //Converting user to JSON value
    const filePath = '/Users/ivicamacbook/Desktop/ALEKSA/AutomationTestStore/AutomationTestStoreInternship/data/user.json'
    //raw.push(user)
    const userJSON = JSON.stringify(user, null, 4)
    //Writing userJSON to user.json file { flag: 'a+' },
    fs.writeFile(filePath, userJSON, err => {})
    //return user with all data
    return user
    }
}