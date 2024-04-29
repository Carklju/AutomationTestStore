import { expect, test } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.describe("review", () => {
  let pm: any;

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    //Go to Automation Test Store Website
    await page.goto("https://automationteststore.com/");
  });

  test("add review to a product in special section", async ({ page }) => {
    //Selecting product and going to its review
    await pm
      .productsPage()
      .selectProductFromSection(
        "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15",
        "latest"
      );
    //Filling review form and return fullName and review text from input fields
    const value = await pm.productsPage().fillWriteReview("3");
    //Calling functions to get locators for assertion
    const nameText = await pm.productsPage().getName();
    const reviewText = await pm.productsPage().getReview();
    const alertText = await pm.productsPage().getAlertHumanVerification();
    //Assertion
    await expect(nameText).toHaveValue(value.name);
    await expect(reviewText).toHaveValue(value.review);
    await expect(alertText).toHaveText(
      "×Human verification has failed! Please try again."
    );
  });
});
