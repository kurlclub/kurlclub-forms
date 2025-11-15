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
  idType: z.string().min(1, 'ID type is required'),
  id: z.string().min(1, 'ID number is required'),
  idDocument: z
    .custom<File | null>((value) => value instanceof File || value === null, {
      error: 'ID document must be a file.',
    })
    .refine((file) => file === null || file.size <= 10 * 1024 * 1024, {
      error: 'File size must be less than 10MB',
    })
    .optional(),
  dob: z.iso.datetime('Please select a valid Date of Birth.'),
  bloodGroup: z.string().min(1, 'Blood group selection is required'),
  gender: z.string().min(1, 'Gender selection is required'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number must be at least 10 digits'),
  email: z.email('Invalid email format'),
  height: z.string().optional(),
  weight: z.string().optional(),
  address: z
    .string()
    .min(1, 'Address is required.')
    .max(250, 'Address must not exceed 250 characters.'),
  purpose: z.string().min(1, 'What brings you here is required'),
  medicalHistory: z.string().optional(),
  emergencyContactName: z.string().min(1, 'Emergency contact name is required'),
  emergencyContactPhone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      'Emergency contact phone must be at least 10 digits'
    ),
  emergencyContactRelation: z
    .string()
    .min(1, 'Emergency contact relation is required'),
});
