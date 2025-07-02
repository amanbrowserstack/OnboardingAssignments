import { test, expect } from '@playwright/test';

test('eBay search for iPhone X with Model filter and sort by High to Low', async ({ page }) => {
  // Navigate to eBay
  await page.goto('https://www.ebay.com');

  // Search for iPhone X
  await page.fill('#gh-ac', 'iPhone X');
  await page.click('button[type="submit"]');

  // Apply Model: Apple iPhone X filter
  await page.click('input[aria-label="Apple iPhone X"]');

  // Sort by Price: High to Low
  await page.click('button[aria-label*="Sort selector"]');
  await page.click('text=Price + Shipping: highest first');

  // Extract and log first 5 products
  const productCards = page.locator('.s-item');
  
  for (let i = 0; i < 5; i++) {
    const card = productCards.nth(i);
    const name = await card.locator('.s-item__title').textContent();
    const price = await card.locator('.s-item__price').textContent();
    const link = await card.locator('.s-item__link').getAttribute('href');
    
    console.log(`Product ${i + 1}:`);
    console.log(`Name: ${name?.replace('New Listing', '').trim()}`);
    console.log(`Price: ${price?.trim()}`);
    console.log(`Link: ${link}`);
    console.log('');
  }
});