import { test, expect } from "@playwright/test";
import path from "path";

test("Input Valid name-surname , Input Valid Address,Input empty  contract , empty Payment Slip", async ({ page }) => {
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
  const ContactInput = page.getByLabel("Contact");
  await expect(ContactInput).toHaveValue("");
  
  // อัปโหลด Payment Slip (ใช้ไฟล์ตัวอย่างจากโฟลเดอร์ tests/assets/slip.png)
  const fileInput = page.locator('input[type="file"][accept="image/*"]'); // locate hidden file input
  const slipPath = path.resolve(__dirname, "assets/slip.png");
  await fileInput.setInputFiles(slipPath); // upload file
  await expect(page.getByRole("img", { name: "Preview" })).toBeVisible();
  await page.getByRole("button", { name: "Confirm Order" }).click();
  
    // ตรวจสอบว่าขึ้นข้อความ Order Confirmed
  const isValid = await ContactInput.evaluate((el: HTMLInputElement) => el.validity.valid);
  expect(isValid).toBeFalsy();
  });

  
  