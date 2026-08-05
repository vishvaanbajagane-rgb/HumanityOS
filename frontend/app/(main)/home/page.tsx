import { HeroSection } from '@/components/home/HeroSection';
import { AISearchBar } from '@/components/home/AISearchBar';
import { QuickActions } from '@/components/home/QuickActions';
import { RecommendationsFeed } from '@/components/home/RecommendationsFeed';
import { GlobalStats } from '@/components/home/GlobalStats';
import { EmergencyButton } from '@/components/home/EmergencyButton';

export const metadata = {
  title: 'Home',
};

export default function HomePage() {
  return (
    <div className="container space-y-10 pb-16 pt-6">
      <HeroSection />
      <AISearchBar />
      <QuickActions />
      <RecommendationsFeed />
      <GlobalStats />
      <EmergencyButton />
    </div>
  );
}