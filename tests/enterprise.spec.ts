import { test, expect } from '@playwright/test';

test('IP Geolocation testing', async ({ page }) => {
  // Navigate to IP detection service
  await page.goto('http://whatismyip.akamai.com/advanced');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Get and print the output
  const pageContent = await page.locator('body').textContent();
  
  console.log('\n' + '='.repeat(50));
  console.log('IP GEOLOCATION OUTPUT');
  console.log('='.repeat(50));
  console.log(pageContent);
  console.log('='.repeat(50) + '\n');
  
  expect(pageContent).toBeTruthy();
});