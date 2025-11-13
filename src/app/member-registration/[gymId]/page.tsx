import type { Metadata } from 'next';

import MemberRegistration from '@/components/pages/member-registration';

export const metadata: Metadata = {
  title: 'Member Registration',
  description: 'Complete your gym membership registration form.',
};

interface MemberRegistrationPageProps {
  params: Promise<{
    gymId: string;
  }>;
}

export default async function MemberRegistrationPage({
  params,
}: MemberRegistrationPageProps) {
  const { gymId } = await params;
  return <MemberRegistration gymId={Number(gymId)} />;
}
