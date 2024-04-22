import { Page, expect } from '@playwright/test'
import { Navigation  } from './navigation.ts'
import { LoginAndRegisterPage } from './loginAndRegisterPage.ts'
export class PageManager{

    private readonly page: Page
    private readonly navigation: Navigation
    private readonly loginAndRegisterPage: LoginAndRegisterPage

    constructor(page: Page){
        this.page = page
        this.navigation = new Navigation(this.page)
        this.loginAndRegisterPage = new LoginAndRegisterPage(this.page)
    }

    navigateTo(){
        return this.navigation
    }

    loginAndRegister(){
        return this.loginAndRegisterPage
    }

}