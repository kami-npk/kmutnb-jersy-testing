import { test, expect } from "@playwright/test";
import path from "path";

test(" Input Valid name-surname,Input Valid contract , empty Payment Slip", async ({ page }) => {
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
  const nameDiv = page.locator("div").filter({ hasText: /^Name - Surname$/ });
  await page.getByLabel("Name - Surname").fill("001");
  const contactDiv = page.locator("div").filter({ hasText: /^Contact *$/ });
  await contactDiv.click();
  await page.getByLabel("Contact").fill("001");
  
  //ยอมโหลด Payment Slip (ใช้ไฟล์ตัวอย่างจากโฟลเดอร์ tests/assets/slip.png)
  //
  await page.getByRole("button", { name: "Confirm Order" }).click();
  
  //ขึ้นว่า Please upload Bank slip to CONFIRM order ข้างล่าง ไม่ยอมให้กด confirm order
    await expect(
  page.getByText("Please upload Bank slip to CONFIRM order", { exact: true })
).toBeVisible();
  });

  
  

