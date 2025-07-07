# Test info

- Name: Amazon search for iPhone X with iOS filter and sort by High to Low
- Location: /Users/amandeswal/Desktop/stackdemo-onboarding/tests/amazon.spec.ts:3:5

# Error details

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#twotabsearchtextbox') to be visible

    at /Users/amandeswal/Desktop/stackdemo-onboarding/tests/amazon.spec.ts:7:14
```

# Page snapshot

```yaml
- heading "Enter the characters you see below" [level=4]
- paragraph: Sorry, we just need to make sure you're not a robot. For best results, please make sure your browser is accepting cookies.
- heading "Type the characters you see in this image:" [level=4]
- img
- text: Try different image
- textbox "Type characters"
- button "Continue shopping"
- link "Conditions of Use":
  - /url: https://www.amazon.com/gp/help/customer/display.html/ref=footer_cou?ie=UTF8&nodeId=508088
- link "Privacy Policy":
  - /url: https://www.amazon.com/gp/help/customer/display.html/ref=footer_privacy?ie=UTF8&nodeId=468496
- text: © 1996-2014, Amazon.com, Inc. or its affiliates
- img
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('Amazon search for iPhone X with iOS filter and sort by High to Low', async ({ page }) => {
   4 |   // Navigate to Amazon
   5 |   await page.goto('https://www.amazon.com');
   6 |
>  7 |   await page.waitForSelector('#twotabsearchtextbox', { state: 'visible' });
     |              ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
   8 |   await page.click('#twotabsearchtextbox');
   9 |   await page.fill('#twotabsearchtextbox', 'iPhone X');
  10 |   await page.press('#twotabsearchtextbox', 'Enter');
  11 |
  12 |   // Apply iOS filter
  13 |   await page.check('input[value*="Apple"]');
  14 |   // Sort by Price: High to Low
  15 |   await page.selectOption('#s-result-sort-select', 'price-desc-rank');
  16 |
  17 |   // Extract and log first 5 products
  18 |   const productCards = page.locator('[data-component-type="s-search-result"]');
  19 |   
  20 |   for (let i = 0; i < 5; i++) {
  21 |     const card = productCards.nth(i);
  22 |     const name = await card.locator('h2 span').first().textContent();
  23 |     const priceWhole = await card.locator('.a-price-whole').first().textContent();
  24 |     const priceFraction = await card.locator('.a-price-fraction').first().textContent();
  25 |     const price = `$${priceWhole}.${priceFraction}`;
  26 |     const link = await card.locator('h2 a').first().getAttribute('href');
  27 |     const fullLink = `https://www.amazon.com${link}`;
  28 |     
  29 |     console.log(`Product ${i + 1}:`);
  30 |     console.log(`Name: ${name}`);
  31 |     console.log(`Price: ${price}`);
  32 |     console.log(`Link: ${fullLink}`);
  33 |     console.log('');
  34 |   }
  35 | });
```