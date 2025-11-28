import * as z from 'zod';

export const verifyOTPSchema = z.object({
  otp_code: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
  remember_me: z.boolean().optional(),
});

export type VerifyOTPFormData = z.infer<typeof verifyOTPSchema>;

