import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly getLogoText: Locator;
  readonly getFooterText: Locator;
  readonly getFiltersDropdown: Locator;
  readonly getShopingCartButton: Locator;
  readonly getAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.getLogoText = page.locator(
      "xpath=//*[@id='header_container']/div[1]/div[2]/div"
    );
    this.getFooterText = page.locator(
      "xpath=//*[@id='page_wrapper']/footer/div"
    );
    this.getFiltersDropdown = page.locator(
      "xpath=//*[@id='header_container']/div[2]/div/span/select"
    );
    this.getShopingCartButton = page.locator(
      "xpath=//*[@id='shopping_cart_container']/a"
    );
    this.getMenuButton = page.locator("xpath=//*[@id='react-burger-menu-btn']");
    this.getAddToCartButton = page.locator(
      "xpath=//*[@id='add-to-cart-sauce-labs-backpack']"
    );
  }
}
