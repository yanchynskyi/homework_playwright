import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { InventoryPage } from "../page-objects/inventoryPage";

//positive login case
test("Login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("standard_user");
  await loginPage.getPasswordField.pressSequentially("secret_sauce");
  await loginPage.getSubmitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});

//negative login case
test("Login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("incorect_username");
  await loginPage.getPasswordField.pressSequentially("incorect_password");
  await loginPage.getSubmitLoginButton.click();
  const errorMessage = await loginPage.getIncorrectErrorText.textContent();
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//verify inventory page elements
test("Verify inventory page elements", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.getEmailField.pressSequentially("standard_user");
  await loginPage.getPasswordField.pressSequentially("secret_sauce");
  await loginPage.getSubmitLoginButton.click();

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

  //verify logo text
  const logoText = await inventoryPage.getLogoText.textContent();
  expect(logoText).toContain("Swag Labs");

  //verify footer text
  const footerText = await inventoryPage.getFooterText.textContent();
  expect(footerText).toContain(
    " Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
  );

  //verify filter dropdown
  await inventoryPage.getFiltersDropdown.isVisible();

  //verify Shopping Cart button
  await inventoryPage.getShopingCartButton.click();
  expect(page.url()).toBe("https://www.saucedemo.com/cart.html");
});
