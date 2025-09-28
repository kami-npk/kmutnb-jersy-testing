import { test, expect } from '@playwright/test';

test('Order Order: input invalid nametag and valid numbertag',async ({page})=>{
    await page.goto('https://kmutnb-jersy-testing.vercel.app/');
    const errorMsg = page.locator('p:text("*Type in English letters and numbers")');
    await expect(errorMsg).not.toHaveClass(/text-\[#E53535\]/);
    await expect(errorMsg).not.toHaveClass(/animate-shake/);

    await page.getByLabel('Name Tag').fill('JAmeX02!');
    await page.getByLabel('Your Number').fill('001');
    
    await expect(errorMsg).toHaveClass(/text-\[#E53535\]/);
    await expect(errorMsg).toHaveClass(/animate-shake/);

    const countText = page.locator('a:has(svg) p');
    await expect(countText).toHaveCount(0);

    await page.click('button[type=submit]');
    await expect(errorMsg).toHaveClass(/text-\[#E53535\]/);
    await expect(errorMsg).toHaveClass(/animate-shake/);
    await expect(countText).toHaveCount(0);
})