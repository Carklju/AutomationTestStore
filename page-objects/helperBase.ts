import { Page } from '@playwright/test'

export class HelperBase{
    
    readonly page: Page
    
    constructor(page: Page){
        this.page = page
    }
    
    /**
     * * Helper function which waits for provided time
     * @param timeInSeconds - time in seconds 
     */
    async waitForNumberOfSeconds(timeInSeconds: number){
        //Multiply wanted seconds with 1000ms to get real seconds
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}