import { Injectable, Logger } from '@nestjs/common';
import { SendSmtpEmail, TransactionalEmailsApi } from '@getbrevo/brevo';
import { TransactionalEmailsApiApiKeys } from '@getbrevo/brevo/dist/api/transactionalEmailsApi';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  htmlContent?: string;
  textContent?: string;
  sender?: {
    name: string;
    email: string;
  };
  templateId?: number;
  params?: Record<string, string>;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  public apiInstance: TransactionalEmailsApi;
  constructor() {
    this.apiInstance = new TransactionalEmailsApi();
    const apiKey = process.env.BREVO_API_KEY ?? '';
    this.apiInstance.setApiKey(
      TransactionalEmailsApiApiKeys.partnerKey,
      apiKey,
    );
    this.apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, apiKey);
  }

  async sendEmail(): Promise<void> {
    const message = new SendSmtpEmail();
    message.subject = 'First email';
    message.textContent = 'Hello world!';
    message.sender = {
      name: 'Soluction Tree',
      email: 'soluction@soluctiontree.com',
    };
    message.to = [{ email: 'mataveli91@gmail.com', name: 'Jane Smith' }];
    await this.apiInstance.sendTransacEmail(message);
  }

  async sendPasswordResetEmail(): Promise<void> {
    await this.sendEmail();
  }
}
