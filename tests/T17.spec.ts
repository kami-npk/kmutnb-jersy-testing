import { test, expect } from "@playwright/test";
import path from "path";

test("Input Valid name-surname , Input Valid Address,Input Valid contract , uploaded Payment Slip", async ({ page }) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/");
  const errorMsg = page.locator(
    'p:text("*Type in English letters and numbers")'
  );
  await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
  await expect(errorMsg).not.toHaveClass(/animate-shake/);
  await page.click("button[type=submit]");


  await page.goto("https://kmutnb-jersy-testing.vercel.app/cart");
  await page.locator("div.cursor-pointer", { hasText: "Delivery" }).first().click();
  const checkoutButton = page.locator("button:has-text('Check Out')");
  


  await page.goto("https://kmutnb-jersy-testing.vercel.app/checkout");
  await page.getByLabel("Shipping address").fill("191/191 กรุงเทพมหานคร");
  const nameDiv = page.locator("div").filter({ hasText: /^Name - Surname$/ });
  await page.getByLabel("Name - Surname").fill("001");
  const contactDiv = page.locator("div").filter({ hasText: /^Contact *$/ });
  await contactDiv.click();
  await page.getByLabel("Contact").fill("001");
  
  // อัปโหลด Payment Slip (ใช้ไฟล์ตัวอย่างจากโฟลเดอร์ tests/assets/slip.png)
  await page.getByRole("button", { name: "Confirm Order" }).click();
  
    // ตรวจสอบว่าขึ้นข้อความ Order Confirmed
  await expect(
  page.getByText("Please upload Bank slip to CONFIRM order", { exact: true })
).toBeVisible();
  });

  
  

