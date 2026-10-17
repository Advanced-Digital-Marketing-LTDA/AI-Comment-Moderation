import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const path of ['/reviews/', '/reviews/napoleoncat/', '/reviews/moderaty/']) {
  test(`review page ${path} renders, links onward and passes accessibility checks`, async ({
    page,
  }) => {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://aicommentmoderation.com${path}`,
    );
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 800 });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });
}
test('the hub lists ten tools that each open their review', async ({ page }) => {
  await page.goto('/reviews/');
  const links = page.locator('#tool-list article h3 a');
  await expect(links).toHaveCount(10);
  await links.first().click();
  await expect(page).toHaveURL(/\/reviews\/moderaty\/$/);
  await expect(page.locator('h1')).toHaveText('Moderaty review');
});
