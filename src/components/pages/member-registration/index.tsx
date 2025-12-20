'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  KFormField,
  KFormFieldType,
} from '@/components/shared/form/k-formfield';
import ProfilePictureUploader from '@/components/shared/profile-picture-uploader';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreateMember } from '@/hooks/use-create-member';
import { useGymDetails } from '@/hooks/use-gym-details';
import {
  bloodGroupOptions,
  genderOptions,
  idTypeOptions,
  purposeOptions,
  relationOptions,
} from '@/lib/constants';
import { type CreateMemberDetailsData } from '@/lib/utils/member-form-mapper';
import { createMemberSchema } from '@/schemas/index';

import SuccessScreen from './success-screen';

interface MemberRegisterProps {
  gymId: number;
}

export default function MemberRegister({ gymId }: MemberRegisterProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: gymDetails } = useGymDetails(gymId);
  const mutation = useCreateMember(gymId);

  const form = useForm<CreateMemberDetailsData>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      profilePicture: null,
      name: '',
      email: undefined,
      phone: '',
      dob: undefined,
      height: '',
      weight: '',
      address: '',
      gender: '',
      bloodGroup: '',
      idType: undefined,
      id: undefined,
      idDocument: undefined as unknown as File,
      purpose: undefined,
      medicalHistory: undefined,
      emergencyContactName: undefined,
      emergencyContactPhone: undefined,
      emergencyContactRelation: undefined,
    },
  });

  const onSubmit = (data: CreateMemberDetailsData) => {
    mutation.mutate(data, {
      onSuccess: () => setIsSubmitted(true),
      onError: (error: Error) => {
        alert(error.message || 'Registration failed. Please try again.');
      },
    });
  };

  if (isSubmitted) return <SuccessScreen />;

  return (
    <div className="bg-background-dark">
      <div className="max-w-xl mx-auto w-full">
        {/* Header */}
        <div className="pt-6 pb-3 px-4 border-b border-white/10">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/icon-192.png"
              alt="Kurl Club Logo"
              width={48}
              height={48}
              className="shadow-md rounded-lg"
            />
            {gymDetails ? (
              <h1 className="text-3xl font-bold text-white tracking-tight text-center">
                {gymDetails.gymName}
              </h1>
            ) : (
              <Skeleton className="h-9 w-48" />
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white mb-2">
            Member Registration
          </h2>

          {/* Description */}
          {gymDetails ? (
            <p className="text-gray-400 text-[15px] leading-relaxed">
              Welcome to {gymDetails.gymName}! Please complete this form to
              begin your membership journey with us. All fields are required
              unless marked optional.
            </p>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="px-4 py-4 pb-8">
          <div className="bg-white dark:bg-secondary-blue-700 rounded-lg shadow-sm p-6">
            <FormProvider {...form}>
              <form
                id="add-member-form"
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <h5 className="text-white text-base font-normal leading-normal mt-0!">
                  Personal Information
                </h5>
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Name"
                  mandetory
                />
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="email"
                  label="Email"
                />
                <KFormField
                  fieldType={KFormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="phone"
                  label="Phone"
                  placeholder="(555) 123-4567"
                  mandetory
                />
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  mandetory
                />
                <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name="height"
                      label="Height (CM)"
                      mandetory
                    />
                  </div>
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name="weight"
                      label="Weight (KG)"
                      mandetory
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.DATE_INPUT}
                      control={form.control}
                      name="dob"
                      label="Date of birth (DD/MM/YYYY"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.SELECT}
                      control={form.control}
                      name="bloodGroup"
                      label="Blood Group"
                      options={bloodGroupOptions}
                      mandetory
                    />
                  </div>
                </div>
                <KFormField
                  fieldType={KFormFieldType.TEXTAREA}
                  control={form.control}
                  name="address"
                  label="Address"
                  mandetory
                />

                {/* Health & Fitness */}
                <h5 className="text-white text-base font-normal leading-normal mt-8!">
                  Health & Fitness Goals
                </h5>
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="purpose"
                  label="What brings you here?"
                  options={purposeOptions}
                />
                <KFormField
                  fieldType={KFormFieldType.TEXTAREA}
                  control={form.control}
                  name="medicalHistory"
                  label="Medical History or Notes"
                />

                {/* ID Verification */}
                <h5 className="text-white text-base font-normal leading-normal mt-8!">
                  Identity Verification
                </h5>
                <p className="text-gray-400 text-sm -mt-2 mb-2">
                  Please provide a government-issued ID for verification
                </p>
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="idType"
                  label="ID Type"
                  options={idTypeOptions}
                />
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="id"
                  label="ID Number"
                  maxLength={20}
                />
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <KFormField
                      fieldType={KFormFieldType.SKELETON}
                      control={form.control}
                      name="profilePicture"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <ProfilePictureUploader
                            files={field.value as File | null}
                            onChange={(file) => field.onChange(file)}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                  <div className="w-1/2">
                    <KFormField
                      fieldType={KFormFieldType.FILE_UPLOAD}
                      control={form.control}
                      name="idDocument"
                      label="ID Copy (Optional)"
                      type="document"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <h5 className="text-white text-base font-normal leading-normal mt-8!">
                  Emergency Contact
                </h5>
                <p className="text-gray-400 text-sm -mt-2 mb-2">
                  Who should we contact in case of emergency?
                </p>
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="emergencyContactName"
                  label="Emergency Contact Name"
                />
                <KFormField
                  fieldType={KFormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="emergencyContactPhone"
                  label="Emergency Contact Phone"
                  placeholder="(555) 123-4567"
                />
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="emergencyContactRelation"
                  label="Relation"
                  options={relationOptions}
                />
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? 'Submitting...' : 'Register'}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
