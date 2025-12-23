'use client';

import { useMutation } from '@tanstack/react-query';

import {
  CreateMemberDetailsData,
  mapMemberToFormData,
} from '@/lib/utils/member-form-mapper';
import { createMember } from '@/services/member-register';

export function useCreateMember(gymId: number) {
  return useMutation({
    mutationFn: (data: CreateMemberDetailsData) => {
      const fd = mapMemberToFormData(data);
      return createMember(fd, gymId);
    },
  });
}
