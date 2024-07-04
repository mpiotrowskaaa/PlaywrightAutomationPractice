import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverInput = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');

  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  actionCloseButton = this.page.getByTestId('close-button');

  messageText = this.page.locator('#show_messages');

  topUpReceiverInput = this.page.locator('#widget_1_topup_receiver');
  topUpAmountInput = this.page.locator('#widget_1_topup_amount');
  topUpAgreementCheckbox = this.page.locator(
    '#uniform-widget_1_topup_agreement span',
  );
  topUpExecuteButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });

  moneyValueText = this.page.locator('#money_value');
  userNameText = this.page.getByTestId('user-name');

  async makeQuickTransfer(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.fillInTransferReceiverInput(receiverId);
    await this.fillInTransferAmountInput(transferAmount);
    await this.fillInTransferTitleInput(transferTitle);

    await this.clickTransferButton();
    await this.clickActionCloseButton();
  }

  async makeMobileTopUp(
    topUpReceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.fillInTopUpReceiverInput(topUpReceiver);
    await this.fillInTopUpAmountInput(topUpAmount);
    await this.clickTopUpAgreementCheckbox();

    await this.clickTopUpExecuteButton();
    await this.clickActionCloseButton();
  }

  async fillInTransferReceiverInput(receiverId: string): Promise<void> {
    await this.transferReceiverInput.selectOption(receiverId);
  }

  async fillInTransferAmountInput(transferAmount: string): Promise<void> {
    await this.transferAmountInput.fill(transferAmount);
  }

  async fillInTransferTitleInput(transferTitle: string): Promise<void> {
    await this.transferTitleInput.fill(transferTitle);
  }

  async clickTransferButton(): Promise<void> {
    await this.transferButton.click();
  }

  async fillInTopUpReceiverInput(topUpReceiver: string): Promise<void> {
    await this.topUpReceiverInput.selectOption(topUpReceiver);
  }

  async fillInTopUpAmountInput(topUpAmount: string): Promise<void> {
    await this.topUpAmountInput.fill(topUpAmount);
  }

  async clickTopUpAgreementCheckbox(): Promise<void> {
    await this.topUpAgreementCheckbox.click();
  }

  async clickTopUpExecuteButton(): Promise<void> {
    await this.topUpExecuteButton.click();
  }

  async clickActionCloseButton(): Promise<void> {
    await this.actionCloseButton.click();
  }
}
