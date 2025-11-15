import { z } from 'zod/v4';

import { createMemberSchema } from '@/schemas';

export type CreateMemberDetailsData = z.infer<typeof createMemberSchema>;

const memberApiMap: Record<string, keyof CreateMemberDetailsData> = {
  Name: 'name',
  Email: 'email',
  Phone: 'phone',
  Gender: 'gender',
  Dob: 'dob',
  BloodGroup: 'bloodGroup',
  Address: 'address',
  FitnessGoal: 'purpose',
  IdType: 'idType',
  IdNumber: 'id',
  EmergencyContactName: 'emergencyContactName',
  EmergencyContactPhone: 'emergencyContactPhone',
  EmergencyContactRelation: 'emergencyContactRelation',
  Height: 'height',
  Weight: 'weight',
  MedicalHistory: 'medicalHistory',
};

export function mapMemberToFormData(data: CreateMemberDetailsData) {
  const fd = new FormData();

  for (const [apiKey, field] of Object.entries(memberApiMap)) {
    const value = data[field];
    if (value !== undefined && value !== null && value !== '') {
      fd.append(apiKey, String(value));
    }
  }

  if (data.profilePicture instanceof File) {
    fd.append('Photo', data.profilePicture);
  }

  if (data.idDocument instanceof File) {
    fd.append('IdCopy', data.idDocument);
  }

  return fd;
}
