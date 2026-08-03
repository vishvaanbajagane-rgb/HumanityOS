import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HumanityOS — One Intelligent Platform for Every Human Need',
    template: '%s | HumanityOS',
  },
  description:
    'HumanityOS connects underserved communities to healthcare, education, government schemes, emergency services, employment, and more — powered by AI.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1220' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-center" closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}