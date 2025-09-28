import { test, expect } from "@playwright/test";
import path from "path";

test(" Input empty name-surname,Input Valid contract ", async ({ page }) => {
  await page.goto("https://kmutnb-jersy-testing.vercel.app/");
  const errorMsg = page.locator(
    'p:text("*Type in English letters and numbers")'
  );
  await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
  await expect(errorMsg).not.toHaveClass(/animate-shake/);
  await page.click("button[type=submit]");


  await page.goto("https://kmutnb-jersy-testing.vercel.app/cart");
  const checkoutButton = page.locator("button:has-text('Check Out')");
    


  await page.goto("https://kmutnb-jersy-testing.vercel.app/checkout");
  const nameInput = page.getByLabel("Name - Surname");
  await expect(nameInput).toHaveValue("");
  const contactDiv = page.locator("div").filter({ hasText: /^Contact *$/ });
  await contactDiv.click();
  await page.getByLabel("Contact").fill("001");
  
  // อัปโหลด Payment Slip (ใช้ไฟล์ตัวอย่างจากโฟลเดอร์ tests/assets/slip.png)
  const fileInput = page.locator('input[type="file"][accept="image/*"]'); // locate hidden file input
  const slipPath = path.resolve(__dirname, "assets/slip.png");
  await fileInput.setInputFiles(slipPath); // upload file
  await expect(page.getByRole("img", { name: "Preview" })).toBeVisible();
  await page.getByRole("button", { name: "Confirm Order" }).click();
  
    // ตรวจสอบว่าขึ้นข้อความ Order Confirmed
  const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
  expect(isValid).toBeFalsy();
  });

  
  

