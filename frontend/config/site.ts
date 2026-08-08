import {
  HeartPulse, GraduationCap, Briefcase, Landmark, HandHeart, Users, Utensils, ShieldAlert,
} from 'lucide-react';

export const siteConfig = {
  name: 'HumanityOS',
  tagline: 'One Intelligent Platform for Every Human Need',
};

// `key` maps to the `nav.*` keys in /locales/<locale>.json
export const quickActionLinks = [
  { href: '/healthcare', key: 'healthcare', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-500/10' },
  { href: '/education', key: 'education', icon: GraduationCap, color: 'text-primary-600', bg: 'bg-primary-500/10' },
  { href: '/employment', key: 'employment', icon: Briefcase, color: 'text-secondary-600', bg: 'bg-secondary-500/10' },
  { href: '/government-schemes', key: 'governmentSchemes', icon: Landmark, color: 'text-accent-600', bg: 'bg-accent-500/10' },
  { href: '/ngos', key: 'ngos', icon: HandHeart, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { href: '/volunteers', key: 'volunteer', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { href: '/food-support', key: 'foodSupport', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { href: '/disaster-alerts', key: 'disasterAlerts', icon: ShieldAlert, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
];