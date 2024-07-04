export class SideMenuComponent {
  constructor(private page) {}

  paymentButton = this.page.getByRole('link', { name: 'płatności' });

  async navigateToPaymentPage(): Promise<void> {
    await this.paymentButton.click();
  }
}
