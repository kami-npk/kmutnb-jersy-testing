import { test, expect } from "@playwright/test";

test("Cart: Check Price on cart , order >= 5", async ({ page }) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/");

  await page.getByLabel("Name Tag").fill("JAmeX02");
  const targetDiv = page.locator("div").filter({ hasText: /^Your Number$/ });
  await targetDiv.click();
  await page.getByLabel("Your Number").fill("001");
  for (let i = 0; i < 4; i++) {
    await page.getByText("+").click();
  }
  await page.click("button[type=submit]");
  const errorMsg = page.locator(
    'p:text("*Type in English letters and numbers")'
  );
  await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
  await expect(errorMsg).not.toHaveClass(/animate-shake/);

  const countText = page.locator("a:has(svg) p");
  await expect(countText).toHaveText(/\d+/);
  console.log(await countText.innerText());

  await page.goto("https://kmutnb-jersy-testing.vercel.app/cart");
  const totalsection = page.locator('div[class*="w-\\[40%\\]"]', {
    hasText: "Discount",
  });
  const discount = totalsection.locator('p:has-text("THB")')
  console.log(await discount.first().innerText());
  const total = totalsection.getByRole('paragraph').filter({ hasText: /^1625 THB$/ })
  console.log(await total.innerText());
  expect(await discount.first().innerText()).toBe('70 THB');
  expect(await total.innerText()).toBe('1625 THB');
});
