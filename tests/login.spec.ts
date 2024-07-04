import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    await loginPage.login(userId, userPassword);

    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    const incorrectUserId = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    await loginPage.fillInUserId(incorrectUserId);
    await loginPage.passwordInput.click();

    await expect(loginPage.loginError).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    const userId = loginData.userId;
    const incorrectPassword = '1234';
    const expectedErrorMessage = 'hasło ma min. 8 znaków';

    await loginPage.fillInUserId(userId);
    await loginPage.fillInPassword(incorrectPassword);
    await loginPage.passwordInput.blur();

    await expect(loginPage.passwordError).toHaveText(expectedErrorMessage);
  });
});
