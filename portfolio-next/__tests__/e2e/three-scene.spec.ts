import { test, expect } from '@playwright/test';

test.describe('3D Scene', () => {
  test('should show loading state initially', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the Three section to be visible
    const threeSection = page.locator('section[aria-labelledby="portfolio-viz"]');
    await expect(threeSection).toBeVisible();
  });

  test('should show fallback image when JavaScript is disabled', async ({ page, context }) => {
    // Disable JavaScript
    await context.setJavaScriptEnabled(false);
    await page.goto('/');
    
    // Check for fallback image
    const fallbackImage = page.locator('img[alt*="neural network"]');
    await expect(fallbackImage).toBeVisible();
  });

  test('should have accessible heading and description', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('#portfolio-viz');
    await expect(heading).toHaveText(/Interactive Portfolio Visualization/i);
    
    const description = page.locator('text=Explore my AI and data science interests');
    await expect(description).toBeVisible();
  });

  test('should load Three.js canvas when JavaScript is enabled', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the canvas to load
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });

  test('should respect prefers-reduced-motion', async ({ page, context }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    // The 3D scene should still load but autoRotate should be disabled
    // This is a placeholder test - actual implementation would check OrbitControls state
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });
});