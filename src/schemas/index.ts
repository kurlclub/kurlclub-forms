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
  id: z.string().min(1, 'Id number is required'),
  dob: z.iso.datetime('Please select a valid Date of Birth.'),
  doj: z.iso.datetime('Please select a valid Date of Joining.'),
  bloodGroup: z.string().min(1, 'Blood group selection is required'),
  gender: z.string().min(1, 'Gender selection is required'),
  membershipPlanId: z.string().min(1, 'Package selection is required'),
  feeStatus: z.string().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number must be at least 10 digits'),
  email: z.email('Invalid email format'),
  height: z.string().min(1, 'Height is required'),
  weight: z.string().min(1, 'Weight is required'),
  personalTrainer: z.union([z.string(), z.number()]),
  address: z
    .string()
    .min(1, 'Address is required.')
    .max(250, 'Address must not exceed 250 characters.'),
  amountPaid: z.string().optional(),
  workoutPlanId: z.string().min(1, 'Workout plan selection is required'),
  modeOfPayment: z.string().optional(),
  customSessionRate: z.string().optional(),
});
