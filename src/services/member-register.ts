import { api } from '@/lib/api';

export const createMember = async (data: FormData, gymId: number) => {
  try {
    const response = await api.post(`/Member/onboarding/${gymId}`, data);
    return response;
  } catch (error) {
    console.error('Error during member registration:', error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Something went wrong. Please check your information and try again.';

    throw new Error(errorMessage);
  }
};
