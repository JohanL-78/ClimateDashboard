import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header';

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const interTighter = Inter_Tight({
  variable: "--font-inter-tighter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Climate Dashboard - Climate Data",
  description: "NASA GISTEMP climate data visualization",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} ${interTighter.variable} antialiased bg-stone-200 text-slate-900 min-h-screen font-sans`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
