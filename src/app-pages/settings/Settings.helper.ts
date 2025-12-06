// Settings module helper functions and types

export interface ContactSettingsData {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  mapUrl: string;
}

export interface PaymentSettingsData {
  stripePublicKey: string;
  stripeSecretKey: string;
  stripeEnabled: boolean;
  paypalClientId: string;
  paypalClientSecret: string;
  paypalEnabled: boolean;
  codEnabled: boolean;
  codFee: number;
}

export interface SocialSettingsData {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  tiktok: string;
}

export interface ProfileSettingsData {
  name: string;
  email: string;
  avatar?: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultContactSettings: ContactSettingsData = {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  workingHours: '',
  mapUrl: '',
};

export const defaultPaymentSettings: PaymentSettingsData = {
  stripePublicKey: '',
  stripeSecretKey: '',
  stripeEnabled: false,
  paypalClientId: '',
  paypalClientSecret: '',
  paypalEnabled: false,
  codEnabled: true,
  codFee: 0,
};

export const defaultSocialSettings: SocialSettingsData = {
  facebook: '',
  twitter: '',
  instagram: '',
  youtube: '',
  linkedin: '',
  tiktok: '',
};

