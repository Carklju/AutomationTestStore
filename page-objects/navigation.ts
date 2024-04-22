import { Page } from '@playwright/test'

export class Navigation{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * * Function that clicks on login and registration in navigation bar
     */
    async RegisterPage(){
        // * Locators
        const loginAndRegister = await this.page.getByText('Login or register').click()
        // * Click on the login and register in navbar
        await this.page.getByRole('button', {name: 'Continue'}).click()
    }
}