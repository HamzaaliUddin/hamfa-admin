// ============================================
// TERMS & CONDITIONS MOCK DATA
// ============================================

export type Term = {
  id: string;
  title: string;
  type: 'terms' | 'privacy' | 'refund' | 'shipping';
  description: string;
  content: string;
  version: string;
  status: 'active' | 'inactive' | 'draft';
  effectiveDate: string;
  updatedAt: string;
  createdAt: string;
};

export const terms: Term[] = [
  {
    id: '1',
    title: 'Terms & Conditions',
    type: 'terms',
    description: 'General terms and conditions of use',
    content: `
# Terms and Conditions

## 1. Introduction
Welcome to Hamfa Store. By accessing and using our website, you accept and agree to be bound by the terms and conditions outlined below.

## 2. Use of Website
You may use our website for lawful purposes only. You must not use our website in any way that causes damage to the website or interferes with other users' enjoyment.

## 3. Products and Services
All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.

## 4. User Accounts
You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.

## 5. Limitation of Liability
We shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.

## 6. Modifications
We reserve the right to modify these terms at any time. Your continued use of the website constitutes acceptance of modified terms.

## 7. Contact
For questions about these terms, please contact us at support@hamfa.com
    `,
    version: '1.2',
    status: 'active',
    effectiveDate: '2024-01-15',
    updatedAt: '2024-02-10',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Privacy Policy',
    type: 'privacy',
    description: 'How we collect, use, and protect your data',
    content: `
# Privacy Policy

## 1. Information We Collect
We collect personal information that you provide when creating an account, placing orders, or contacting us.

## 2. How We Use Your Information
- To process and fulfill your orders
- To communicate with you about your account
- To improve our services
- To send promotional emails (with your consent)

## 3. Information Sharing
We do not sell or rent your personal information to third parties. We may share information with service providers who assist in operating our website.

## 4. Data Security
We implement appropriate technical and organizational measures to protect your personal information.

## 5. Cookies
We use cookies to enhance your browsing experience. You can control cookies through your browser settings.

## 6. Your Rights
You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.

## 7. Updates
This policy may be updated periodically. We will notify you of significant changes.
    `,
    version: '1.0',
    status: 'active',
    effectiveDate: '2024-01-15',
    updatedAt: '2024-01-15',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    title: 'Refund Policy',
    type: 'refund',
    description: 'Return and refund guidelines',
    content: `
# Refund Policy

## 1. Return Period
You have 14 days from the date of delivery to return products for a refund.

## 2. Eligible Items
- Items must be unused and in original packaging
- All tags and labels must be attached
- Proof of purchase is required

## 3. Non-Returnable Items
- Sale or clearance items
- Opened hygiene products
- Custom or personalized items

## 4. Refund Process
1. Contact customer service to initiate a return
2. Ship the item back to us (shipping costs may apply)
3. We'll inspect the item upon receipt
4. Refund will be processed within 5-10 business days

## 5. Exchanges
We offer exchanges for defective or damaged items. Contact us within 7 days of delivery.

## 6. Shipping Costs
Original shipping costs are non-refundable. Return shipping costs are the customer's responsibility unless the item is defective.
    `,
    version: '1.1',
    status: 'active',
    effectiveDate: '2024-01-15',
    updatedAt: '2024-01-28',
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    title: 'Shipping Policy',
    type: 'shipping',
    description: 'Delivery and shipping information',
    content: `
# Shipping Policy

## 1. Shipping Methods
We offer the following shipping options:
- Standard Shipping: 5-7 business days
- Express Shipping: 2-3 business days
- Same-Day Delivery: Available in select cities

## 2. Shipping Costs
- Free shipping on orders above $50
- Standard shipping: $5.99
- Express shipping: $14.99

## 3. Processing Time
Orders are processed within 1-2 business days (excluding weekends and holidays).

## 4. Tracking
You'll receive a tracking number via email once your order ships.

## 5. International Shipping
Currently, we only ship within Pakistan. International shipping may be available in the future.

## 6. Delivery Issues
If your order hasn't arrived within the expected timeframe, please contact our customer service team.

## 7. Address Changes
Contact us immediately if you need to change your shipping address. We cannot modify addresses once the order has shipped.
    `,
    version: '1.0',
    status: 'active',
    effectiveDate: '2024-01-15',
    updatedAt: '2024-01-15',
    createdAt: '2024-01-15',
  },
];

export default terms;

