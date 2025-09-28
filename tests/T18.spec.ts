import { test, expect } from "@playwright/test";

test("Check Order: Input Valid placed order Name ", async ({
  page,
}) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/CheckOrder");
  await page.getByLabel('Name - Surname').fill('JAmeX02');
  await page.click('button[type=submit]');
  const items = page.getByText('ig : JAmeX02');
  await expect(items).toBeVisible();
});
