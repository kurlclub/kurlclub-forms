import { z } from 'zod/v4';

export const createMemberSchema = z.object({
  profilePicture: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      error: 'Profile picture must be a file.',
    })
    .refine((file) => file === null || file.size <= 5 * 1024 * 1024, {
      error: 'File size must be less than 5MB',
    })
    .optional(),
  name: z.string().min(1, 'Name is required'),
  idType: z.string().optional(),
  id: z.string().max(20, 'ID number must not exceed 20 characters').optional(),
  idDocument: z
    .custom<File | undefined>(
      (value) => value === undefined || value instanceof File,
      {
        error: 'ID document must be a file.',
      }
    )
    .refine((file) => !file || file.type === 'application/pdf', {
      error: 'Only PDF files are allowed',
    })
    .refine((file) => !file || file.size <= 4 * 1024 * 1024, {
      error: 'File size must be less than 4MB',
    })
    .optional(),
  dob: z.iso.datetime('Please select a valid Date of Birth.').optional(),
  bloodGroup: z.string().min(1, 'Blood group selection is required'),
  gender: z.string().min(1, 'Gender selection is required'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  email: z.email('Invalid email format').optional(),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  address: z
    .string()
    .min(1, 'Address is required.')
    .max(250, 'Address must not exceed 250 characters.'),
  purpose: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  emergencyContactRelation: z.string().optional(),
});
