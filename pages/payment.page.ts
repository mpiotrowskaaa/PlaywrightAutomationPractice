import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverInput = this.page.getByTestId('transfer_receiver');
  transferToInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');

  transferButton = this.page.getByRole('button', { name: 'wykonaj przelew' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.fillInTransferReceiverInput(transferReceiver);
    await this.fillInTransferToInput(transferAccount);
    await this.fillInTransferAmountInput(transferAmount);

    await this.clickTransferButton();
    await this.clickActionCloseButton();
  }

  async fillInTransferReceiverInput(transferReceiver: string): Promise<void> {
    await this.transferReceiverInput.fill(transferReceiver);
  }

  async fillInTransferToInput(transferAccount: string): Promise<void> {
    await this.transferToInput.fill(transferAccount);
  }

  async fillInTransferAmountInput(transferAmount: string): Promise<void> {
    await this.transferAmountInput.fill(transferAmount);
  }

  async clickTransferButton(): Promise<void> {
    await this.transferButton.click();
  }

  async clickActionCloseButton(): Promise<void> {
    await this.actionCloseButton.click();
  }
}
