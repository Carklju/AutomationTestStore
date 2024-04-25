import { Page, expect } from '@playwright/test'
import fs from 'fs'
import { faker } from '@faker-js/faker';

export class MyProfilePage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Function that reads user.json, gets password and fills it into current password input field
     * Also fills new password and new password confirms with new random password and changes old passwrod to new password in JSON file
     */
    async changePassword(){
        //Read json
        let userJSON = fs.readFileSync('/Users/ivicamacbook/Desktop/ALEKSA/AutomationTestStore/AutomationTestStoreInternship/data/user.json', 'utf-8')
        //Parse user.json
        let user = JSON.parse(userJSON)
        //Fills current password with password from user.json
        await this.page.locator('#PasswordFrm_current_password').fill(user[0].password)
        //Create new random password
        const newPassword = faker.internet.password()
        //Changes old password to new password in user.json
        user[0].password = newPassword
        //Fills new password to new password and new password confirm input fields
        await this.page.locator('#PasswordFrm_password').fill(newPassword)
        await this.page.locator('#PasswordFrm_confirm').fill(newPassword)
        //Click on the continue button
        await this.page.getByRole('button', {name: 'Continue'}).click()
    }

    /**
     * Function that returns success alert 
     * @returns 
     */
    async getSuccessAlert(){
        return this.page.locator('.alert-success')
    }
}