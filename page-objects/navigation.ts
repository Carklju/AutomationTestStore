import { Page } from "@playwright/test";

export class Navigation {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * * Function that clicks on login and registration in navigation bar
   */
  async RegisterPage() {
    // * Locators
    const loginAndRegister = await this.page
      .getByText("Login or register")
      .click();
    // * Click on the login and register in navbar
    await this.page.getByRole("button", { name: "Continue" }).click();
  }

  /**
   * * Function that hovers on the welcome back in navigation bar and clicks on section that is provided in parameter
   */
  async MyProfilePage(myProfileSection: string) {
    // Hover on the Welcome back link in navigation bar
    await this.page
      .locator(
        '[href="https://automationteststore.com/index.php?rt=account/account"]'
      )
      .first()
      .hover();
    await this.page.getByText(myProfileSection).click();
  }

  /**
   * Function that clicks on Automation Test Store logo to navigate user to home page
   */
  async HomePage() {
    //Click on logo
    await this.page.getByTitle("Automation Test Store").click();
  }
}
