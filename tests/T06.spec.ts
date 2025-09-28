import { test, expect } from "@playwright/test";

test("Order Order: input valid nametag and valid numbertag", async ({
  page,
}) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/");

  await page.getByLabel("Name Tag").fill("JAmeX02");
  const targetDiv = page.locator("div").filter({ hasText: /^Your Number$/ });
  await targetDiv.click();
  await page.getByLabel("Your Number").fill("001");
  await page.getByText('+').click();
  await page.getByText('+').click();
  await page.click("button[type=submit]");
  const errorMsg = page.locator(
    'p:text("*Type in English letters and numbers")'
  );
  await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
  await expect(errorMsg).not.toHaveClass(/animate-shake/);

  const countText = page.locator("a:has(svg) p");
  await expect(countText).toHaveText(/\d+/);
  console.log(await countText.innerText());
});
