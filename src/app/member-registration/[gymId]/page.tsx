import type { Metadata } from 'next';

import MemberRegistration from '@/components/pages/member-registration';

export const metadata: Metadata = {
  title: 'Register Member',
  description: 'Register new gym member',
};

interface MemberRegistrationPageProps {
  params: {
    gymId: string;
  };
}

export default function MemberRegistrationPage({
  params,
}: MemberRegistrationPageProps) {
  return <MemberRegistration gymId={Number(params.gymId)} />;
}
