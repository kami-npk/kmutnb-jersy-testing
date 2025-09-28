import { test, expect } from "@playwright/test";

test("Check Order: Input empty order Name ", async ({
  page,
}) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/CheckOrder");
  await page.getByLabel('Name - Surname').clear();
  await page.click('button[type=submit]');
  const items = page.getByText('Please enter your name-surname');
  await expect(items).toBeVisible();
});
