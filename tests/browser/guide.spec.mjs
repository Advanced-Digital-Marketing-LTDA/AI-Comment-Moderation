import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('fictional explorer supports presets, mode changes, repeated clicks and reset', async ({
  page,
}) => {
  const external = [];
  page.on('request', (request) => {
    if (!request.url().startsWith('http://127.0.0.1:4531')) external.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('AI Comment Moderation');
  await expect(page.locator('#decision-label')).toHaveText('Allow');
  await page.locator('#scenario-select').selectOption('harmless-blocked-word');
  await page.getByRole('radio', { name: /^Stricter review/ }).check();
  await expect(page.locator('#decision-label')).toHaveText('Consider review');
  await expect(page.locator('#decision-reason')).toContainText('false positive');
  await page.getByRole('button', { name: 'Reset examples' }).click();
  await page.getByRole('button', { name: 'Reset examples' }).click();
  await expect(page.locator('#scenario-select')).toHaveValue('audio-criticism');
  await expect(page.getByRole('radio', { name: /^Cautious review/ })).toBeChecked();
  await expect(page.locator('#decision-label')).toHaveText('Allow');
  await page.locator('#scenario-select').selectOption('ambiguous-hostility');
  await expect(page.locator('#decision-label')).toHaveText('Consider review');
  await expect(page.locator('#scenario-context')).toContainText('hostile warning');
  await expect(page.locator('#demo-status')).toContainText('Ambiguous phrase');
  expect(external).toEqual([]);
  expect(
    await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })),
  ).toEqual({ local: 0, session: 0 });
});
test('workflow helper keeps non-YouTube visitors out of the product path', async ({ page }) => {
  await page.goto('/');
  for (const name of ['Social & ads', 'Website / CMS', 'Developer / API']) {
    await page.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('#workflow-moderaty')).toBeHidden();
    await expect(page.locator('#workflow-title')).not.toContainText('Moderaty');
    await expect(page.locator('#workflow-step')).not.toContainText('Moderaty');
  }
  await page.getByRole('button', { name: 'YouTube creator', exact: true }).click();
  await expect(page.locator('#workflow-moderaty')).toBeVisible();
  await expect(page.locator('#workflow-title')).toHaveText('Start with YouTube Studio');
});
test('checklist uses current-tab state and a repeatable local reset', async ({ page }) => {
  await page.goto('/');
  const boxes = page.locator('#review-checklist input[type=checkbox]');
  await boxes.nth(0).check();
  await boxes.nth(1).check();
  await expect(page.locator('#checklist-count')).toHaveText('2 of 6 ready');
  await page.getByRole('button', { name: 'Reset checklist' }).click();
  await expect(page.locator('#checklist-count')).toHaveText('0 of 6 ready');
  await expect(boxes.nth(0)).not.toBeChecked();
});
test('keyboard skip link and collapsed mobile navigation work', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await expect(page.locator('main')).toHaveCSS('outline-style', 'solid');
  await expect(page.locator('main')).toHaveCSS('outline-width', '3px');
  await expect(page.locator('main')).toHaveCSS('outline-color', 'rgb(105, 80, 161)');
  await expect(page.locator('main')).toHaveCSS('outline-offset', '-3px');
  await page.getByRole('button', { name: 'Menu: open navigation' }).click();
  await expect(page.getByRole('button', { name: 'Menu: close navigation' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Menu: open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});
test('all examples and checklist remain useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4531/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('#decision-label')).toHaveText('Allow');
  await page.getByText('Read all 10 fictional examples', { exact: false }).click();
  await expect(page.locator('[data-static-scenario]')).toHaveCount(10);
  await expect(page.locator('[data-static-scenario]').last()).toContainText('Product complaint');
  await expect(page.locator('#review-checklist')).toBeVisible();
  await page.locator('#review-checklist input[type=checkbox]').first().check();
  await expect(page.locator('#checklist-count')).toBeHidden();
  await expect(page.locator('#reset-checklist')).toBeHidden();
  await context.close();
});
test('printed dark-section text has dark colors on the white print background', async ({
  page,
}) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.dark-section')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  for (const selector of [
    '.dark-section .eyebrow',
    '.dark-section .small-label',
    '.dark-section a',
  ])
    for (const item of await page.locator(selector).all())
      await expect(item).toHaveCSS('color', 'rgb(0, 0, 0)');
});
test('root, query canonical, assets and genuine unknown-route status', async ({
  page,
  request,
}) => {
  await page.goto('/?utm_source=fictional');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://aicommentmoderation.com/',
  );
  const response = await request.get('/missing-page/');
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain('Page not found');
  expect((await request.get('/social-card.png')).status()).toBe(200);
});
test('responsive layouts, reduced motion and accessibility', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const width of [320, 375, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.locator('h1')).toBeVisible();
  }
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.screenshot({ path: 'evidence/desktop.png', fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  const mobile = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(mobile.violations).toEqual([]);
  await page.screenshot({ path: 'evidence/mobile.png', fullPage: true });
});

test('keyboard-only explorer, category and checklist tasks', async ({ page }) => {
  await page.goto('/');
  const select = page.locator('#scenario-select');
  await select.focus();
  await select.press('Home');
  for (let i = 0; i < 6; i++) await select.press('ArrowDown');
  await page.getByRole('radio', { name: /^Stricter review/ }).focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#decision-label')).toHaveText('Consider review');
  await page.getByRole('button', { name: 'Reset examples' }).focus();
  await page.keyboard.press('Enter');
  await expect(select).toHaveValue('audio-criticism');
  await page.getByRole('button', { name: 'Social & ads', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#workflow-moderaty')).toBeHidden();
  await page.locator('#check-0').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('#checklist-count')).toHaveText('1 of 6 ready');
});

test('failed external modules keep the full static guide truthful', async ({ page }) => {
  await page.route('**/_astro/*.js', (route) => route.abort());
  await page.goto('/');
  await expect(page.locator('#scenario-select')).toBeDisabled();
  await expect(page.locator('#decision-label')).toHaveText('Allow');
  await expect(page.locator('#checklist-count')).toBeHidden();
  await expect(page.locator('[data-static-scenario]')).toHaveCount(10);
  await page.getByText('Read all 10 fictional examples', { exact: false }).click();
  await expect(page.locator('[data-static-scenario]').last()).toBeVisible();
});
