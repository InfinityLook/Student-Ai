import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-slate-900 text-white min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
