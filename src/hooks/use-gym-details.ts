'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

interface GymDetails {
  id: number;
  gymName: string;
  location: string;
  contactNumber1: string;
  contactNumber2: string | null;
  email: string;
  socialLinks: string | null;
  gymAdminId: number;
  status: string | null;
  gymIdentifier: string;
}

export function useGymDetails(gymId: number) {
  return useQuery({
    queryKey: ['gym', gymId],
    queryFn: async () => {
      const response = await api.get<{ data: GymDetails }>(`/Gym/${gymId}`);
      return response.data;
    },
  });
}
