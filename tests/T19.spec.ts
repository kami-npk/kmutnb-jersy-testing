import { test, expect } from "@playwright/test";

test("Check Order: Input Valid unplaced order  Name  ", async ({
  page,
}) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/CheckOrder");
  await page.getByLabel('Name - Surname').fill('JAmeX021');
  await page.click('button[type=submit]');
  const items = page.getByText('Name is not correct or No purchase with this name Please contact us');
  await expect(items).toBeVisible();
});
