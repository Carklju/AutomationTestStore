import { Page, expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.describe("registration", () => {
  let pm: any;
  test.beforeEach(async ({ page }) => {
    //Instance of Page Manager Class
    pm = new PageManager(page);
    //Go to Automation Test Store Website
    await page.goto("https://automationteststore.com/");
    //Click on the Login/register in navigation bar
    await pm.navigateTo().RegisterPage();
    //Assert that URL is correct
    await expect(page).toHaveURL(
      "https://automationteststore.com/index.php?rt=account/create"
    );
  });

  test("user registration using valid credentials", async ({ page }) => {
    //Register using all valid credentials
    await pm.loginAndRegister().RegisterWithAllCredentialsAndChecks();
    //Assert that account has been created
    await expect(page.getByText(" Your Account Has Been Created!")).toHaveText(
      " Your Account Has Been Created!"
    );
  });
});
