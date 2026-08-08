'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { apiClient } from '@/services/api-client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton';

const profileSchema = z.object({
  name: z.string().max(255).optional(),
  country: z.string().max(100).optional(),
  phone: z.string().max(32).optional(),
  bio: z.string().max(500).optional(),
  notificationEmail: z.boolean(),
  notificationPush: z.boolean(),
  highContrast: z.boolean(),
  largeText: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileData extends ProfileFormValues {
  email: string | null;
  photoUrl: string | null;
  preferredLanguage: string;
}

export function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      country: '',
      phone: '',
      bio: '',
      notificationEmail: true,
      notificationPush: true,
      highContrast: false,
      largeText: false,
    },
  });

  useEffect(() => {
    apiClient
      .get<ProfileData>('/profile/me')
      .then(({ data }) => {
        setProfile(data);
        reset({
          name: data.name ?? '',
          country: data.country ?? '',
          phone: data.phone ?? '',
          bio: data.bio ?? '',
          notificationEmail: data.notificationEmail,
          notificationPush: data.notificationPush,
          highContrast: data.highContrast,
          largeText: data.largeText,
        });
      })
      .catch((err) => console.error('Failed to load profile', err))
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const { data } = await apiClient.put<ProfileData>('/profile/me', values);
      setProfile(data);
      toast.success('Profile updated');
    } catch (err) {
      console.error('Profile update failed', err);
      toast.error('Could not update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-11 w-full" />
        <LoadingSkeleton className="h-11 w-full" />
        <LoadingSkeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-muted-foreground">Personal Information</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" {...register('name')} />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={profile?.email ?? 'Not linked'} disabled />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="e.g. India" {...register('country')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" placeholder="+91 98765 43210" {...register('phone')} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={3}
            maxLength={500}
            className="focus-ring w-full rounded-xl border border-border bg-white/70 px-4 py-2 text-sm placeholder:text-muted-foreground dark:bg-white/5"
            placeholder="A short note about yourself (optional)"
            {...register('bio')}
          />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">Notifications</h2>
        <label className="flex items-center justify-between rounded-xl border border-border p-3">
          <span className="text-sm">Email notifications</span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary-600"
            checked={watch('notificationEmail')}
            onChange={(e) => setValue('notificationEmail', e.target.checked)}
          />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-border p-3">
          <span className="text-sm">Push notifications</span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary-600"
            checked={watch('notificationPush')}
            onChange={(e) => setValue('notificationPush', e.target.checked)}
          />
        </label>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">Accessibility</h2>
        <label className="flex items-center justify-between rounded-xl border border-border p-3">
          <span className="text-sm">High contrast mode</span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary-600"
            checked={watch('highContrast')}
            onChange={(e) => setValue('highContrast', e.target.checked)}
          />
        </label>
        <label className="flex items-center justify-between rounded-xl border border-border p-3">
          <span className="text-sm">Large text</span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-border accent-primary-600"
            checked={watch('largeText')}
            onChange={(e) => setValue('largeText', e.target.checked)}
          />
        </label>
      </section>

      <Button type="submit" size="lg" isLoading={isSubmitting}>
        <Save className="h-4 w-4" />
        Save Changes
      </Button>
    </form>
  );
}