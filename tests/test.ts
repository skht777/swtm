import { expect, test } from '@playwright/test';

test('index page has expected timer', async ({ page }) => {
  await page.goto('/swtm/');
  expect(await page.textContent('#timer')).toMatch(/\d{2}:\d{2}:\d{2}/);
});
