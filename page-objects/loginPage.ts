import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly getEmailField: Locator;
  readonly getPasswordField: Locator;
  readonly getSubmitLoginButton: Locator;
  readonly getIncorrectErrorText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getEmailField = page.locator("xpath=//*[@id='user-name']");
    this.getPasswordField = page.locator("xpath=//*[@id='password']");
    this.getSubmitLoginButton = page.locator("xpath=//*[@id='login-button']");
    this.getIncorrectErrorText = page.locator("xpath=//h3[@data-test='error']");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com/");
  }
}
