import type { Metadata } from 'next';
import './globals.css';
import { NotificationProvider } from '@/components/NotificationSystem';

export const metadata: Metadata = {
  title: 'Student AI',
  description: 'AI studijní asistent',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="bg-[#07090E] text-white min-h-screen antialiased">
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
