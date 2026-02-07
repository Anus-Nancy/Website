import './globals.css';
import { Navbar } from '../components/Navbar';

export const metadata = {
  title: 'FixIt Now',
  description: 'Service marketplace platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
