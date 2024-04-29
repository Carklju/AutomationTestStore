import { Page, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import fs from "fs";

export class LoginAndRegisterPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * * Function that registers user with random valid credentials
   */
  async RegisterWithAllCredentialsAndChecks() {
    //Calling create random user function
    const user = await this.createRandomUser();
    //Filling input fields with data from user.json
    await this.page.locator("#AccountFrm_firstname").fill(user[0].firstName);
    await this.page.locator("#AccountFrm_lastname").fill(user[0].lastName);
    await this.page.locator("#AccountFrm_email").fill(user[0].email);
    await this.page.locator("#AccountFrm_telephone").fill(user[0].telephone);
    await this.page.locator("#AccountFrm_fax").fill(user[0].fax);
    await this.page.locator("#AccountFrm_company").fill(user[0].company);
    await this.page
      .locator("#AccountFrm_address_1")
      .fill(user[0].addressPrimary);
    await this.page
      .locator("#AccountFrm_address_2")
      .fill(user[0].addressSecondary);
    await this.page.locator("#AccountFrm_city").fill(user[0].city);
    await this.page.locator("#AccountFrm_postcode").fill(user[0].zipCode);
    await this.page.locator("#AccountFrm_loginname").fill(user[0].loginName);
    await this.page.locator("#AccountFrm_password").fill(user[0].password);
    await this.page
      .locator("#AccountFrm_confirm")
      .fill(user[0].passwordConfirm);
    //Click on privacy policy checkbox
    const privacyPolicy = this.page.locator("#AccountFrm_agree");
    await privacyPolicy.click();
    //Click on register button
    await this.page.getByTitle("Continue").click();
    //Assert Welcome back in nav bar
    await expect(
      this.page.locator("#customer_menu_top li a div").first()
    ).toHaveText(`Welcome back ${user[0].firstName}`);
  }

  /**
   * * Function which fills input fields with custom data, including empty fileds
   * @param firstName - First name of a user
   * @param lastName - Last name of a user
   * @param email - Email of a user
   * @param addressPrimary - Primary address of a user
   * @param city - City where user leaves
   * @param zipCode - ZIP/Postal code of a city where user lives
   * @param loginName - Users login name
   * @param password - Password
   * @param passwordConfirm - Repeat above password (optional)
   */
  async RegisterWithEmptyOrModifiedFields(
    firstName: string,
    lastName: string,
    email: string,
    addressPrimary: string,
    city: string,
    zipCode: string,
    loginName: string,
    password: string,
    passwordConfirm: string
  ) {
    //If field is not undefined (empty string) fill that data to input field
    if (firstName !== undefined) {
      await this.page.locator("#AccountFrm_firstname").fill(firstName);
    }
    if (lastName !== undefined) {
      await this.page.locator("#AccountFrm_lastname").fill(lastName);
    }
    if (email !== undefined) {
      await this.page.locator("#AccountFrm_email").fill(email);
    }
    if (addressPrimary !== undefined) {
      await this.page.locator("#AccountFrm_address_1").fill(addressPrimary);
    }
    if (city !== undefined) {
      await this.page.locator("#AccountFrm_city").fill(city);
    }
    if (zipCode !== undefined) {
      await this.page.locator("#AccountFrm_postcode").fill(zipCode);
    }
    if (loginName !== undefined) {
      await this.page.locator("#AccountFrm_loginname").fill(loginName);
    }
    if (password !== undefined) {
      await this.page.locator("#AccountFrm_password").fill(password);
    }
    if (passwordConfirm !== undefined) {
      await this.page.locator("#AccountFrm_confirm").fill(passwordConfirm);
    }
    //Select region from dropdown
    const regionDropdown = this.page.locator("#AccountFrm_zone_id");
    await regionDropdown.click();
    const regionOption = await regionDropdown.selectOption({ label: "Angus" });
    //Click on privacy policy checkbox
    const privacyPolicy = this.page.locator("#AccountFrm_agree");
    await privacyPolicy.click();
    //Click on register button
    await this.page.getByTitle("Continue").click();
  }

  /**
   * * Function that returns user with random valid credentials
   */
  private async createRandomUser() {
    // ! FAKER CLASS
    //Create random First Name
    const randomFirstName = faker.person.firstName();
    //Create random Last Name
    const randomLastName = faker.person.lastName();
    //Create random email using js library
    const randomEmail = `${randomFirstName.replace(" ", "")}${faker.number.int(1000)}@test.com`;
    //Create random Telephone
    const randomTelephone = faker.phone.number();
    //Create random Fax
    const randomFax = faker.phone.number();
    //Create random company
    const randomCompany = faker.company.name();
    //Create random primary address
    const randomAddressPrimary = faker.location.streetAddress();
    //Create random secondary address
    const randomAddressSecondary = faker.location.secondaryAddress();
    //Create random City
    const randomCity = faker.location.city();
    //------------------------------------------------------------------------------------------------------------------------
    //Select Region
    const regionDropdown = this.page.locator("#AccountFrm_zone_id");
    await regionDropdown.click();
    const regionOption = await regionDropdown.selectOption({ label: "Angus" });
    //Create random ZIPCode
    const randomZIPCode = faker.number.int({ max: 9999999999 });
    //Create random login name
    const randomLoginName = faker.internet.userName();
    //Create random password
    const randomPassword = faker.internet.password();
    //Confirm password is same as the password
    const randomPasswordConfirm = randomPassword;
    //Creating user
    let user = [
      {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomEmail,
        telephone: randomTelephone,
        fax: randomFax,
        company: randomCompany,
        addressPrimary: randomAddressPrimary,
        addressSecondary: randomAddressSecondary,
        city: randomCity,
        country: "United Kingdom",
        region: "Angus",
        zipCode: randomZIPCode.toString(),
        loginName: randomLoginName,
        password: randomPassword,
        passwordConfirm: randomPasswordConfirm,
      },
    ];
    //Converting user to JSON value
    const filePath = "data/user.json";
    //raw.push(user)
    const userJSON = JSON.stringify(user, null, 4);
    //Writing userJSON to user.json file { flag: 'a+' },
    fs.writeFile(filePath, userJSON, (err) => {});
    //return user with all data
    return user;
  }

  /**
   * * Function that returns text content of locator for Alert Text Zip Code error message
   * @returns
   */
  async getAlertText() {
    return await this.page
      .getByText(" Zip/postal code must be between 3 and 10 characters!")
      .first()
      .textContent();
  }

  /**
   * * Function that returns text content of locator for error message below ZIP Code input field
   * @returns
   */
  async getAlertHelpBlock() {
    return await this.page
      .getByText("Zip/postal code must be between 3 and 10 characters!", {
        exact: true,
      })
      .textContent();
  }
}
