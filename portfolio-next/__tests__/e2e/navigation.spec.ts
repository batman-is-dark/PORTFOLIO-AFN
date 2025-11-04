import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to projects page from header', async ({ page }) => {
    await page.goto('/');
    
    // Click on Projects link in header
    await page.click('a[href="/projects"]');
    
    // Verify URL changed
    await expect(page).toHaveURL('/projects');
    
    // Verify projects page heading is visible
    await expect(page.locator('h1, h2').filter({ hasText: /projects/i })).toBeVisible();
  });

  test('should navigate to writing page from header', async ({ page }) => {
    await page.goto('/');
    
    // Click on Writing link in header
    await page.click('a[href="/writing"]');
    
    // Verify URL changed
    await expect(page).toHaveURL('/writing');
    
    // Verify writing page heading is visible
    await expect(page.locator('h1, h2').filter({ hasText: /writing/i })).toBeVisible();
  });

  test('should navigate back to home page', async ({ page }) => {
    await page.goto('/projects');
    
    // Click on home/logo link
    await page.click('a[href="/"]');
    
    // Verify URL is home
    await expect(page).toHaveURL('/');
    
    // Verify hero heading is visible
    await expect(page.locator('h1').filter({ hasText: /aspiring ai engineer/i })).toBeVisible();
  });

  test('should have accessible navigation landmarks', async ({ page }) => {
    await page.goto('/');
    
    // Check for main landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Check for header/navigation
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();
  });
});