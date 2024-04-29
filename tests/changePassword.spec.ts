import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.describe("My Profile", () => {
  let pm: any;
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    //Go to Automation Test Store Website
    await page.goto("https://automationteststore.com/");
    //Click on the Login/register in navigation bar
    await pm.navigateTo().RegisterPage();
    //Register using all valid credentials
    await pm.loginAndRegister().RegisterWithAllCredentialsAndChecks();
  });

  test("user changing password", async ({ page }) => {
    //User navigates to home page
    await pm.navigateTo().HomePage();
    //User hovers welcome back 'name' and click on change password
    await pm.navigateTo().MyProfilePage("  Change password");
    //User changes password
    await pm.onMyProfilePage().changePassword();
    //Call success alert locator
    const successAlert = await pm.onMyProfilePage().getSuccessAlert();
    //Assert that success alert is visible
    await expect(successAlert).toBeVisible();
  });
});
