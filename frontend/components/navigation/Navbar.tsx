'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeartHandshake, LogOut, User as UserIcon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { siteConfig } from '@/config/site';

function initialsFromName(name: string | null): string {
  if (!name) return 'G';
  const parts = name.trim().split(' ');
  return (parts[0]?.[0] ?? '').concat(parts[1]?.[0] ?? '').toUpperCase() || 'U';
}

export function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/home" className="focus-ring flex items-center gap-2 rounded-lg">
          <div className="gradient-brand flex h-9 w-9 items-center justify-center rounded-xl shadow-sm">
            <HeartHandshake className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text hidden text-lg font-bold sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-500" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="focus-ring rounded-full" aria-label="Account menu">
                <Avatar>
                  {user?.photoUrl && <AvatarImage src={user.photoUrl} alt={user?.name ?? 'User'} />}
                  <AvatarFallback>{initialsFromName(user?.name ?? null)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p className="font-medium">{user?.name ?? 'Guest'}</p>
                <p className="text-xs font-normal text-muted-foreground">{user?.email ?? 'Browsing as guest'}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}