"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logout } from '@/app/auth/actions';
import { ThemeToggle } from '@/components/theme-toggle';

const defaultLinks = [
  { href: '/', label: 'Home' },
  { href: '/#products', label: 'Services' },
];

const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
];

const LogoutButton = () => (
  <form action={logout}>
    <Button type="submit" variant="ghost">
      Logout
    </Button>
  </form>
);

const LoginButton = () => (
    <Button variant="ghost" asChild>
      <Link href="/login">Admin Login</Link>
    </Button>
);

export function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname();

  const navLinks = isLoggedIn ? [...defaultLinks, ...adminLinks] : defaultLinks;

  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="font-headline">LeadMagnet</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild
              className={cn(
                "font-medium",
                (pathname === link.href && !link.href.includes('#')) ? "text-primary" : "text-muted-foreground",
                (isHomePage && link.href === '/') && "text-primary"
              )}
            >
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <div className="ml-4 flex items-center gap-2">
            {isLoggedIn ? <LogoutButton /> : <LoginButton />}
            <ThemeToggle />
          </div>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex h-full flex-col p-4">
              <Link href="/" className="mb-4 flex items-center gap-2 font-bold text-lg">
                <span className="font-headline">LeadMagnet</span>
              </Link>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant={(pathname === link.href && !link.href.includes('#')) || (isHomePage && link.href === '/') ? "secondary" : "ghost"}
                    asChild
                    className="justify-start"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
              </nav>
              <div className="mt-auto border-t pt-4">
                <div className="flex items-center justify-between">
                  {isLoggedIn ? <LogoutButton /> : <LoginButton />}
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
