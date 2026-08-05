import {
  HeartPulse,
  GraduationCap,
  Briefcase,
  Landmark,
  HandHeart,
  Users,
  Utensils,
  ShieldAlert,
} from 'lucide-react';

export const siteConfig = {
  name: 'HumanityOS',
  tagline: 'One Intelligent Platform for Every Human Need',
};

export const quickActionLinks = [
  { href: '/healthcare', label: 'Healthcare', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-500/10' },
  { href: '/education', label: 'Education', icon: GraduationCap, color: 'text-primary-600', bg: 'bg-primary-500/10' },
  { href: '/employment', label: 'Employment', icon: Briefcase, color: 'text-secondary-600', bg: 'bg-secondary-500/10' },
  { href: '/government-schemes', label: 'Govt. Schemes', icon: Landmark, color: 'text-accent-600', bg: 'bg-accent-500/10' },
  { href: '/ngos', label: 'NGOs', icon: HandHeart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { href: '/volunteers', label: 'Volunteer', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { href: '/food-support', label: 'Food Support', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { href: '/disaster-alerts', label: 'Disaster Alerts', icon: ShieldAlert, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
];