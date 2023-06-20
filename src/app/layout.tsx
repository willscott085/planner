import clsx from 'clsx';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The planner for devs',
  description: 'A simple little planning tools for software developers˝',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'w-full', 'mx-auto', 'max-w-6xl')}>
        {children}
      </body>
    </html>
  );
}
