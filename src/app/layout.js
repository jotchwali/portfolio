// src/app/layout.js
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0A2ECE] min-h-screen text-white font-sans relative">
        {/* Header/Nav Bar */}
        <header className="fixed top-0 left-0 right-0 bg-[#0A2ECE] z-50 py-4 px-6 flex justify-between items-center border-b border-white/10">
          {/* Home Link */}
          <Link href="/" className="flex items-center space-x-2 text-white font-bold hover:opacity-80 transition-opacity">
            <span className="text-sm">home</span>
            <span className="text-sm">/</span>
            <span className="text-sm">家</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/gallery" className="text-sm font-bold hover:opacity-80 transition-opacity">gallery</Link>
            <Link href="/devwork" className="text-sm font-bold hover:opacity-80 transition-opacity">dev work</Link>
            <Link href="/extracurriculars" className="text-sm font-bold hover:opacity-80 transition-opacity">extracurriculars</Link>
            <a href="https://www.youtube.com/channel/UCQY-6Qnas9B9F9ZrfQedQPQ" target="_blank" className="text-sm font-bold hover:opacity-80 transition-opacity">youtube</a>
            <Link href="/contact" className="text-sm font-bold hover:opacity-80 transition-opacity">contact me</Link>
          </nav>

          {/* Chinese Characters */}
          <div className="text-2xl font-bold opacity-100 tracking-wider">
            李以勤
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 pb-12 bg-[#0A2ECE]">
          {children}
        </main>
      </body>
    </html>
  );
}