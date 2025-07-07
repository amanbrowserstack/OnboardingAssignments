import { test, expect } from '@playwright/test';

test('StackDemo order flow', async ({ page }) => {
// Go to StackDemo
  await page.goto('https://bstackdemo.com/');

  // Sign in as demouser
  await page.click('#signin');
  await page.fill('#react-select-2-input', 'demouser');
  await page.press('#react-select-2-input', 'Enter');
  await page.fill('#react-select-3-input', 'testingisfun99');
  await page.press('#react-select-3-input', 'Enter');
  await page.click('#login-btn');

  // Wait for login
  await expect(page.locator('.username')).toContainText('demouser');

  // Add iPhone 12 to cart
  await page.click('text=iPhone 12 >> nth=0');
  await page.click('text=Add to cart');

  // Go to checkout
  await page.click('.buy-btn');

  await page.fill('#firstNameInput', 'John');
  await page.fill('#lastNameInput', 'Doe');
  await page.fill('#addressLine1Input', '123 Test Street');
  await page.fill('#provinceInput', 'Test State');
  await page.fill('#postCodeInput', '12345');
  await page.click('#checkout-shipping-continue');
  
  // Confirm order success
  await expect(page.locator('#confirmation-message')).toContainText('Your Order has been successfully placed.');   
});
