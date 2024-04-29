import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.describe("add product to cart", () => {
  let pm: any;
  test.beforeEach(async ({ page }) => {
    //Instance of Page Manager Class
    pm = new PageManager(page);
    //Go to Automation Test Store Website
    await page.goto("https://automationteststore.com/");
    //Click on the Login/register in navigation bar
    await pm.navigateTo().RegisterPage();
    //Register using all valid credentials
    await pm.loginAndRegister().RegisterWithAllCredentialsAndChecks();
  });
  test("add multiple products to cart and check their total and sub-total", async ({
    page,
  }) => {
    //Navigate to Home Page
    await pm.navigateTo().HomePage();
    //Add product to cart
    let subTotalFirstProduct = await pm
      .onAddToCartPage()
      .addProductToCart("Skinsheen Bronzer Stick", "featured", 3);
    //Assertion for subtotal price
    await expect(async () => {
      expect(subTotalFirstProduct.totalPriceText).toBe(
        subTotalFirstProduct.totalPrice
      );
    }).toPass();
    //Navigate to Home Page
    await pm.navigateTo().HomePage();
    //Add second product to cart
    let subTotalSecondProduct = await pm
      .onAddToCartPage()
      .addProductToCart(
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "latest",
        2
      );
    //Assertion for subtotal price
    await expect(async () => {
      expect(subTotalSecondProduct.totalPriceText).toBe(
        subTotalSecondProduct.totalPrice
      );
    }).toPass();
    //Call total price function to get total price
    const totalAssert = await pm.onAddToCartPage().getTotalPrice();
    //Assert that total price locator have correct text
    await expect(totalAssert.totalLocator).toHaveText(totalAssert.totalText);
  });
});
