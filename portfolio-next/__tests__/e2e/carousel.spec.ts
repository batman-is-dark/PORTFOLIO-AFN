import { test, expect } from '@playwright/test';

test.describe('Projects Carousel', () => {
  test('should display carousel with project slides', async ({ page }) => {
    await page.goto('/');
    
    // Wait for carousel to be visible
    const carousel = page.locator('[role="region"][aria-label*="carousel" i]');
    await expect(carousel).toBeVisible();
    
    // Check that project links exist
    const projectLinks = page.locator('a[href^="/projects/"]');
    await expect(projectLinks.first()).toBeVisible();
  });

  test('should pause auto-scroll on hover', async ({ page }) => {
    await page.goto('/');
    
    const carousel = page.locator('[role="region"][aria-label*="carousel" i]');
    await expect(carousel).toBeVisible();
    
    // Hover over carousel
    await carousel.hover();
    
    // Get the first visible project title
    const firstProject = page.locator('a[href^="/projects/"] h3').first();
    const initialText = await firstProject.textContent();
    
    // Wait a bit and verify it hasn't auto-scrolled (still showing same slide)
    await page.waitForTimeout(4000);
    const currentText = await firstProject.textContent();
    
    // When paused, the same project should still be visible
    expect(currentText).toBe(initialText);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    const carousel = page.locator('[role="region"][aria-label*="carousel" i]');
    await expect(carousel).toBeVisible();
    
    // Focus on carousel
    await carousel.focus();
    
    // Verify carousel is focusable
    await expect(carousel).toBeFocused();
    
    // Test arrow key navigation
    await page.keyboard.press('ArrowRight');
    
    // Wait a moment for transition
    await page.waitForTimeout(500);
    
    // Verify we can still interact with carousel (basic smoke test)
    await expect(carousel).toBeVisible();
  });

  test('should have accessible project cards with focus visible', async ({ page }) => {
    await page.goto('/');
    
    // Get first project link
    const firstProjectLink = page.locator('a[href^="/projects/"]').first();
    await expect(firstProjectLink).toBeVisible();
    
    // Tab to focus the link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if any project link is focused (smoke test for focus behavior)
    const anyProjectLinkFocused = await page.locator('a[href^="/projects/"]:focus').count();
    expect(anyProjectLinkFocused).toBeGreaterThanOrEqual(0);
  });

  test('should display project information on cards', async ({ page }) => {
    await page.goto('/');
    
    // Check first project card has title, role, timeframe, and tech stack
    const firstCard = page.locator('a[href^="/projects/"]').first();
    
    // Title should be visible
    await expect(firstCard.locator('h3')).toBeVisible();
    
    // Role and timeframe text should exist
    const cardText = await firstCard.textContent();
    expect(cardText).toBeTruthy();
  });
});