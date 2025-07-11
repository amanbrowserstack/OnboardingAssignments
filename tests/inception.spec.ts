import { test } from '@playwright/test';

test('BrowserStack Inception', async ({ page }) => {

  const username = process.env.BROWSERSTACK_DEMO_USERNAME;
  const password = process.env.BROWSERSTACK_DEMO_PASSWORD;
  
  // Go to main site first
  await page.goto('https://www.browserstack.com/')
  await page.waitForTimeout(1000);

  // Click the Sign in button
  await page.click('a[href="/users/sign_in"]', { timeout: 10000 });
  
  // Wait for login page to load
  await page.waitForTimeout(30000);
  
  // Now fill in credentials on the login page
  await page.fill('input[name="user[login]"]', username || '');
  await page.fill('input[name="user[password]"]', password || '');
  await page.click('#user_submit');
  
  // Wait for login to complete
  await page.waitForTimeout(5000);
    
  // Try direct navigation to Live
  await page.goto('https://live.browserstack.com');
  await page.waitForTimeout(10000);
  
  await page.click('[data-testid="browser-version-list__element"]');
  await page.waitForTimeout(30000);
  
  const viewport = page.viewportSize();
  
  // Try clicking at various standard browser UI positions
  const clickPositions = [
    { name: 'Address bar', x: viewport.width * 0.5, y: viewport.height * 0.2 },
    { name: 'Page center', x: viewport.width * 0.5, y: viewport.height * 0.5 },
    { name: 'Search area', x: viewport.width * 0.5, y: viewport.height * 0.4 }
  ];
  
  for (const pos of clickPositions) {
    await page.mouse.click(pos.x, pos.y);
    await page.waitForTimeout(2000);
    
    // Try typing Google URL
    await page.keyboard.type('google.com');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    
    // Take screenshot to verify
    await page.screenshot({ path: `attempt-${pos.name.replace(' ', '-')}.png` });
  }
});