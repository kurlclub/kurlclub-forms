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
import ProfilePictureUploader from '@/components/shared/uploaders/profile-uploader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormControl } from '@/components/ui/form';
import { useGymFormOptions } from '@/hooks/use-gymform-options';
import {
  bloodGroupOptions,
  feeStatusOptions,
  genderOptions,
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
    },
  });

  const { formOptions } = useGymFormOptions(gymId);
  const queryClient = useQueryClient();

  const handleSubmit = async (data: CreateMemberDetailsData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profilePicture' && value instanceof File) {
        return formData.append(key, value);
      }

      if (key === 'personalTrainer') {
        return formData.append(key, value === '' ? '0' : String(value));
      }

      formData.append(key, String(value));
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

  const memberDetails = { name: 'New Member', gymNo: '00000' };

  return (
    <div className="min-h-screen bg-background-dark pb-10 px-4">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
<div className="pt-4 pb-5 sticky top-0 bg-background-dark z-30 border-b border-white/10 backdrop-blur-md">
  {/* Logo + Name */}
  <div className="flex items-center justify-center gap-2 mb-2">
    <Image
      src="/icon-192.png"
      alt="Kurl Club Logo"
      width={42}
      height={42}
      className="shadow-md rounded-lg"
    />
    <h1 className="text-2xl font-bold text-white tracking-tight">
      Gymnazo
    </h1>
  </div>

  {/* Greeting */}
<p className="text-gray-400 text-[14px] text-center mb-2">
  💫 Every great transformation begins with one step. Let’s get started! ❤️
</p>

  {/* Section Title */}
<h2 className="text-[19px] font-semibold text-gray-100 text-center">
  Fill in your details below to join
</h2>
</div>

        {/* Form Card */}
        <div className="bg-white dark:bg-secondary-blue-700 rounded-lg mt-2 shadow-sm p-6 ">
          <FormProvider {...form}>
            <form
              id="add-member-form"
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="items-start gap-2 mb-6 flex justify-between">
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
                <Badge className="bg-secondary-blue-400 flex items-center w-fit justify-center text-sm text-white rounded-full h-[30px] py-2 px-2 border border-secondary-blue-300 bg-opacity-100">
                  Gym no: #{memberDetails.gymNo}
                </Badge>
              </div>
              <h5 className="text-white text-base font-normal leading-normal mt-0!">
                Basic Details
              </h5>
              {/* Member Name */}
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Member Name"
              />

              {/* Email */}
              <KFormField
                fieldType={KFormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email"
              />

              {/* Phone */}
              <KFormField
                fieldType={KFormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone"
                placeholder="(555) 123-4567"
              />

              {/* Gender */}
              <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="gender"
                    label="Gender"
                    options={genderOptions}
                  />
                </div>

                {/* Package */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="membershipPlanId"
                    label="Package"
                    options={formOptions?.membershipPlans.map((plan) => ({
                      label: plan.planName,
                      value: String(plan.membershipPlanId),
                    }))}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                {/* height */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.INPUT}
                    control={form.control}
                    name="height"
                    label="Height (In Centimeters)"
                  />
                </div>

                {/* weight */}
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
                {/* Fee Status */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="feeStatus"
                    label="Fee Status"
                    options={feeStatusOptions}
                  />
                </div>
                {/* Mode of Payment */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="modeOfPayment"
                    label="Mode of Payment"
                    options={[
                      { label: 'Cash', value: '0' },
                      { label: 'UPI', value: '1' },
                    ]}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                {/* Date of joining */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.DATE_PICKER}
                    control={form.control}
                    name="doj"
                    label="Date of joining"
                    mode="single"
                    floating
                  />
                </div>

                {/* Date of birth */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.DATE_INPUT}
                    control={form.control}
                    name="dob"
                    label="Date of birth"
                  />
                </div>
              </div>

              <div className="flex justify-between gap-3 flex-wrap sm:flex-nowrap">
                {/* Personal Trainer */}
                <div className="w-full sm:w-1/2 ">
                  <KFormField
                    fieldType={KFormFieldType.SELECT}
                    control={form.control}
                    name="personalTrainer"
                    label="Personal Trainer"
                    options={
                      formOptions?.trainers
                        ? formOptions.trainers.map((option) => ({
                            label: option.trainerName,
                            value: String(option.id),
                          }))
                        : []
                    }
                  />
                </div>

                {/* Blood Group */}
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

              {/* Workout Plan */}
              <KFormField
                fieldType={KFormFieldType.SELECT}
                control={form.control}
                name="workoutPlanId"
                label="Workout Plan"
                options={formOptions?.workoutPlans.map((option) => ({
                  label: option.name,
                  value: String(option.id),
                }))}
              />

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
  );
}
