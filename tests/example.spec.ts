import { test, expect } from "@playwright/test";

//positive login case
test("Login with valid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill('//*[@id="user-name"]', "standard_user");
  await page.fill('//*[@id="password"]', "secret_sauce");

  await page.click('//*[@id="login-button"]');

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
});

//negative login case
test("Login with invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  await page.fill('//*[@id="user-name"]', "invalid_username");
  await page.fill('//*[@id="password"]', "invalid_password");

  await page.click('//*[@id="login-button"]');

  await page.waitForSelector(
    '//*[@id="login_button_container"]/div/form/div[3]/h3'
  );
  const errorMessage = await page.textContent(
    '//*[@id="login_button_container"]/div/form/div[3]/h3'
  );
  expect(errorMessage).toContain(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//#header_container > div.primary_header > div.header_label > div

//verify inventory page elements
test("Verify inventory page elements", async ({ page }) => {
  //login
  await page.goto("https://www.saucedemo.com/");

  await page.fill('//*[@id="user-name"]', "standard_user");
  await page.fill('//*[@id="password"]', "secret_sauce");

  await page.click('//*[@id="login-button"]');

  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");

  //verify logo text
  const logoText = await page.textContent("#header_container");
  expect(logoText).toContain("Swag Labs");

  //verify footer text
  const footerText = await page.textContent("#page_wrapper");
  expect(footerText).toContain(
    " Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy"
  );
});
