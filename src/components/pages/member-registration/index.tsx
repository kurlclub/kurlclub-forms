'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod/v4';

import {
  KFormField,
  KFormFieldType,
} from '@/components/shared/form/k-formfield';
import ProfilePictureUploader from '@/components/shared/profile-picture-uploader';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import {
  bloodGroupOptions,
  genderOptions,
  idTypeOptions,
} from '@/lib/constants';
import { createMemberSchema } from '@/schemas/index';

import { createMember } from './services';

type CreateMemberDetailsData = z.infer<typeof createMemberSchema>;

interface MemberRegisterProps {
  gymId: number;
}

export default function MemberRegister({ gymId }: MemberRegisterProps) {
  const router = useRouter();

  const form = useForm<CreateMemberDetailsData>({
    resolver: zodResolver(createMemberSchema),
    defaultValues: {
      profilePicture: null,
      name: '',
      email: '',
      phone: '',
      amountPaid: '',
      dob: '',
      doj: new Date().toISOString(),
      height: '',
      weight: '',
      address: '',
      gender: '',
      membershipPlanId: '',
      feeStatus: '',
      personalTrainer: 0,
      bloodGroup: '',
      workoutPlanId: '',
      modeOfPayment: '',
      customSessionRate: '',
      idType: '',
      id: '',
      idDocument: null,
    },
  });

  const queryClient = useQueryClient();

  const handleSubmit = async (data: CreateMemberDetailsData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (
        (key === 'profilePicture' || key === 'idDocument') &&
        value instanceof File
      ) {
        return formData.append(key, value);
      }

      if (key === 'personalTrainer') {
        return formData.append(key, value === '' ? '0' : String(value));
      }

      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (gymId) {
      formData.append('gymId', String(gymId));
    }

    const result = await createMember(formData);

    if (result.success) {
      alert(result.success);
      await queryClient.invalidateQueries({ queryKey: ['gymMembers', gymId] });
      form.reset();
      router.push('/members');
    } else {
      alert(result.error);
    }
  };

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
            <h1 className="text-3xl font-bold text-white tracking-tight text-center">
              Gymnazo
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-white mb-2">
            Member Registration
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-[15px] leading-relaxed">
            Welcome! Please complete this form to begin your membership journey
            with us. All fields are required unless marked optional.
          </p>
        </div>

        {/* Form Card */}
        <div className="px-4 py-4 pb-8">
          <div className="bg-white dark:bg-secondary-blue-700 rounded-lg shadow-sm p-6">
            <FormProvider {...form}>
              <form
                id="add-member-form"
                className="space-y-4"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <h5 className="text-white text-base font-normal leading-normal mt-0!">
                  Basic Details
                </h5>
                <KFormField
                  fieldType={KFormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Name"
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
                />
                <KFormField
                  fieldType={KFormFieldType.SELECT}
                  control={form.control}
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                />
                <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name="height"
                      label="Height (In Centimeters)"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.INPUT}
                      control={form.control}
                      name="weight"
                      label="Weight (In Kilograms)"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.DATE_INPUT}
                      control={form.control}
                      name="dob"
                      label="Date of birth"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 ">
                    <KFormField
                      fieldType={KFormFieldType.SELECT}
                      control={form.control}
                      name="bloodGroup"
                      label="Blood Group"
                      options={bloodGroupOptions}
                    />
                  </div>
                </div>
                {/* ID Verification */}
                <h5 className="text-white text-base font-normal leading-normal mt-8!">
                  ID Verification
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

                {/* Address Details */}
                <h5 className="text-white text-base font-normal leading-normal mt-8!">
                  Address Details
                </h5>
                <KFormField
                  fieldType={KFormFieldType.TEXTAREA}
                  control={form.control}
                  name="address"
                  label="Address Line"
                />
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Register
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
