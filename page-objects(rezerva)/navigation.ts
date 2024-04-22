import { Page, expect } from '@playwright/test'
import {HelperBase} from '../page-objects/helperBase'

export class Navigation extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async clickOnRegistration(){
        const loginAndRegister = await this.page.getByText('Login or register').click()
        await this.page.getByRole('button', {name: 'Continue'}).click()
    }
}