import { test, expect } from "@playwright/test";

test("Order: input valid nametag and choose 6GE2 option", async ({ page }) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/");
  const errorMsg = page.locator(
    'p:text("*Type in English letters and numbers")'
  );
  await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
  await expect(errorMsg).not.toHaveClass(/animate-shake/);

  await page.getByLabel("Name Tag").fill("JAmeX02");
  const targetDiv = page.locator("div").filter({ hasText: /^Your Number$/ });
  await targetDiv.click();

  await page.getByLabel("Your Number").fill("01");
  const target2Div = page.getByText("6GE2");
  await target2Div.click();
  await page.click("button[type=submit]");
  await page.goto("https://kmutnb-jersy-testing.vercel.app/cart");
  const ggez = page.getByText("Number :");
  const text = await ggez.first().innerText();
  console.log(text);
  await expect(ggez.first()).toBeVisible();
});
