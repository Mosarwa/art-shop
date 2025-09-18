import { createHash } from 'crypto';

export interface PayFastConfig {
  merchantId: string;
  merchantKey: string;
  passphrase: string;
  sandbox: boolean;
}

export interface PaymentData {
  merchantId: string;
  merchantKey: string;
  returnUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  nameFirst: string;
  nameLast: string;
  emailAddress: string;
  mPaymentId: string;
  amount: string;
  itemName: string;
  itemDescription: string;
  signature?: string;
}

export class PayFastService {
  private config: PayFastConfig;
  private baseUrl: string;

  constructor(config: PayFastConfig) {
    this.config = config;
    this.baseUrl = config.sandbox 
      ? 'https://sandbox.payfast.co.za/eng/process'
      : 'https://www.payfast.co.za/eng/process';
  }

  generateSignature(data: Omit<PaymentData, 'signature'>): string {
    // Create parameter string
    const paramString = Object.entries(data)
      .filter(([key, value]) => value !== '' && value !== null && value !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`)
      .join('&');

    // Add passphrase if provided
    const stringToHash = this.config.passphrase 
      ? `${paramString}&passphrase=${encodeURIComponent(this.config.passphrase)}`
      : paramString;

    // Generate MD5 hash
    return CryptoJS.MD5(stringToHash).toString();
  }

  createPaymentData(orderData: {
    orderId: string;
    amount: number;
    customerName: string;
    customerEmail: string;
    itemName: string;
    itemDescription: string;
  }): PaymentData {
    const baseUrl = window.location.origin;
    
    const paymentData: Omit<PaymentData, 'signature'> = {
      merchantId: this.config.merchantId,
      merchantKey: this.config.merchantKey,
      returnUrl: `${baseUrl}/payment/success`,
      cancelUrl: `${baseUrl}/payment/cancel`,
      notifyUrl: `${baseUrl}/api/payment/notify`,
      nameFirst: orderData.customerName.split(' ')[0] || '',
      nameLast: orderData.customerName.split(' ').slice(1).join(' ') || '',
      emailAddress: orderData.customerEmail,
      mPaymentId: orderData.orderId,
      amount: orderData.amount.toFixed(2),
      itemName: orderData.itemName,
      itemDescription: orderData.itemDescription,
    };

    const signature = this.generateSignature(paymentData);

    return {
      ...paymentData,
      signature,
    };
  }

  redirectToPayment(paymentData: PaymentData): void {
    // Create a form and submit it to PayFast
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.baseUrl;
    form.style.display = 'none';

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value.toString();
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }
}

// PayFast configuration - In production, these should come from environment variables
export const payFastConfig: PayFastConfig = {
  merchantId: '10000100', // Sandbox merchant ID
  merchantKey: '46f0cd694581a', // Sandbox merchant key
  passphrase: 'jt7NOE43FZPn', // Sandbox passphrase
  sandbox: true, // Set to false in production
};

export const payFastService = new PayFastService(payFastConfig);