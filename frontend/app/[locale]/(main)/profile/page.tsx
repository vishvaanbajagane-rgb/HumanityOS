'use client';

import { UserRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { useAuth } from '@/hooks/useAuth';

function initialsFromName(name: string | null | undefined): string {
  if (!name) return 'G';
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '').concat(parts[1]?.[0] ?? '').toUpperCase() || 'U';
}

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container max-w-2xl space-y-8 py-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          {user?.photoUrl && <AvatarImage src={user.photoUrl} alt={user?.name ?? 'User'} />}
          <AvatarFallback className="text-lg">
            {user?.name ? initialsFromName(user.name) : <UserRound className="h-6 w-6" />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user?.name ?? 'Guest User'}</h1>
          <p className="text-sm text-muted-foreground">{user?.email ?? 'Browsing as guest'}</p>
        </div>
      </div>

      <ProfileForm />
    </div>
  );
}