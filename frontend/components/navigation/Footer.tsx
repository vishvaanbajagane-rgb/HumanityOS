import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';
import { siteConfig } from '@/config/site';

const footerLinks = {
  Platform: [
    { href: '/home', label: 'Home' },
    { href: '/healthcare', label: 'Healthcare' },
    { href: '/education', label: 'Education' },
    { href: '/employment', label: 'Employment' },
  ],
  Support: [
    { href: '/emergency', label: 'Emergency' },
    { href: '/ngos', label: 'NGOs' },
    { href: '/volunteers', label: 'Volunteers' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="gradient-brand flex h-8 w-8 items-center justify-center rounded-lg">
              <HeartHandshake className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">{siteConfig.name}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{siteConfig.tagline}</p>
        </div>

        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <h3 className="text-sm font-semibold">{section}</h3>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring rounded text-sm text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-6">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. Built to connect people with the help they need.
        </p>
      </div>
    </footer>
  );
}