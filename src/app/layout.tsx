import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import '@/styles/globals.css'


export const metadata: Metadata = {
  title: 'RICA Demo Plot Platform',
  description: 'Interactive Digital Platform for Tracking Conservation Agriculture Results at RICA Demonstration Plot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}