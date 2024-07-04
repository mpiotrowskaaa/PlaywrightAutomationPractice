import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  loginInput = this.page.getByTestId('login-input');
  passwordInput = this.page.getByTestId('password-input');
  loginButton = this.page.getByTestId('login-button');
  loginError = this.page.getByTestId('error-login-id');
  passwordError = this.page.getByTestId('error-login-password');

  async login(userId: string, userPassword: string): Promise<void> {
    await this.fillInUserId(userId);
    await this.fillInPassword(userPassword);
    await this.clickLoginButton();
  }

  async fillInUserId(userId: string): Promise<void> {
    await this.loginInput.fill(userId);
  }

  async fillInPassword(userPassword: string): Promise<void> {
    await this.passwordInput.fill(userPassword);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
