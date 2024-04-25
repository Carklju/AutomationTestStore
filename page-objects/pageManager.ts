import { Page } from '@playwright/test'
import { Navigation  } from './navigation.ts'
import { LoginAndRegisterPage } from './loginAndRegisterPage.ts'
import { AddToCartPage } from './addToCart.ts'
import { MyProfilePage } from './myProfilePage.ts'
import { ProductPage  } from './productPage.ts'

/**
 * * Class that help us group all of classes into one for easier managing of classes
 */
export class PageManager{

    private readonly page: Page
    private readonly navigation: Navigation
    private readonly loginAndRegisterPage: LoginAndRegisterPage
    private readonly addProductToCart: AddToCartPage
    private readonly myProfilePage: MyProfilePage
    private readonly productPage: ProductPage

    constructor(page: Page){
        this.page = page
        this.navigation = new Navigation(this.page)
        this.loginAndRegisterPage = new LoginAndRegisterPage(this.page)
        this.addProductToCart = new AddToCartPage(this.page)
        this.myProfilePage = new MyProfilePage(this.page)
        this.productPage = new ProductPage(this.page)
    }
    /**
     * * Function that returns navigation class
     * @returns 
     */
    navigateTo(){
        return this.navigation
    }

    /**
     * * Function that returns loginAndRegisterPage class
     * @returns 
     */
    loginAndRegister(){
        return this.loginAndRegisterPage
    }

    /**
     * * Function that returns AddToCartPage class
     * @returns 
     */
    onAddToCartPage(){
        return this.addProductToCart
    }
    onMyProfilePage(){
        return this.myProfilePage
    }

    productsPage(){
        return this.productPage
    }
}