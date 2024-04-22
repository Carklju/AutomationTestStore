import { Page, expect } from '@playwright/test'
import {HelperBase} from './helperBase'
import links from '../data/links.json'

export class Navigation extends HelperBase{

    constructor(page: Page){
        super(page)
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