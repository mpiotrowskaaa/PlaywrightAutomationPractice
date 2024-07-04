import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.pages';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.navigateToPaymentPage();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 7894 1555 4874 1545 45455';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    await paymentPage.makeTransfer(
      transferReceiver,
      transferAccount,
      transferAmount,
    );

    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
