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

  async sendEmail(
    subject: string,
    htmlBody: string,
    email: string,
  ): Promise<void> {
    const message = new SendSmtpEmail();
    message.subject = subject;
    message.textContent = htmlBody;
    message.sender = {
      name: 'Soluction Tree',
      email: 'soluction@soluctiontree.com',
    };
    message.to = [{ email: email }];
    await this.apiInstance.sendTransacEmail(message);
  }

  async sendPasswordResetEmail(
    newPassword: string,
    email: string,
  ): Promise<void> {
    const body = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f8;
            padding: 20px;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #1976d2;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            font-size: 20px;
            margin: 0;
          }
          .content {
            padding: 20px;
            color: #333;
            line-height: 1.6;
          }
          .temp-password {
            display: inline-block;
            background-color: #e3f2fd;
            color: #0d47a1;
            font-size: 20px;
            font-weight: bold;
            padding: 12px 20px;
            border-radius: 6px;
            margin: 20px 0;
            font-family: monospace;
          }
          .footer {
            background-color: #f5f5f5;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hello 👋,</p>
            <p>We received a request to reset your password. Use the temporary password below to log in and set a new one:</p>
            <div class="temp-password">${newPassword}</div>
            <p>If you didn’t request this, you can ignore this email.</p>
          </div>
          <div class="footer">
            <p>© 2024 Soluction Tree.</p>
          </div>
        </div>
      </body>
      </html>
      `;
    await this.sendEmail('Password Reset', body, email);
  }
}
