import { test, expect } from '@playwright/test';

test('Amazon search for iPhone X with iOS filter and sort by High to Low', async ({ page }) => {
  // Navigate to Amazon
  await page.goto('https://www.amazon.com');

  await page.waitForSelector('#twotabsearchtextbox', { state: 'visible' });
  await page.click('#twotabsearchtextbox');
  await page.fill('#twotabsearchtextbox', 'iPhone X');
  await page.press('#twotabsearchtextbox', 'Enter');

  // Apply iOS filter
  await page.check('input[value*="Apple"]');
  // Sort by Price: High to Low
  await page.selectOption('#s-result-sort-select', 'price-desc-rank');

  // Extract and log first 5 products
  const productCards = page.locator('[data-component-type="s-search-result"]');
  
  for (let i = 0; i < 5; i++) {
    const card = productCards.nth(i);
    const name = await card.locator('h2 span').first().textContent();
    const priceWhole = await card.locator('.a-price-whole').first().textContent();
    const priceFraction = await card.locator('.a-price-fraction').first().textContent();
    const price = `$${priceWhole}.${priceFraction}`;
    const link = await card.locator('h2 a').first().getAttribute('href');
    const fullLink = `https://www.amazon.com${link}`;
    
    console.log(`Product ${i + 1}:`);
    console.log(`Name: ${name}`);
    console.log(`Price: ${price}`);
    console.log(`Link: ${fullLink}`);
  }
});