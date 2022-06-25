import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/swtm/');
  expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});
