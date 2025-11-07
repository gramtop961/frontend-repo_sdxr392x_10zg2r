import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Estimator from './components/Estimator';
import { Moon, Sun, PhoneCall, MessageCircle } from 'lucide-react';

function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#1e1e1e] dark:bg-[#0b0b0c] dark:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-black/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
          <a href="#" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#e3dccd] to-[#d4af37]" />
            <span className="font-semibold tracking-wide">LuxSpace Interiors</span>
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm hover:text-[#d4af37]">Services</a>
            <a href="#portfolio" className="text-sm hover:text-[#d4af37]">Portfolio</a>
            <a href="#estimator" className="text-sm hover:text-[#d4af37]">Estimator</a>
            <a href="https://wa.me/919999999999" className="inline-flex items-center gap-2 rounded-full bg-[#1e1e1e] px-4 py-2 text-white transition hover:opacity-90 dark:bg-white dark:text-black">
              <PhoneCall className="h-4 w-4" /> Get Free Consultation
            </a>
          </nav>
          <button onClick={() => setDark((v) => !v)} aria-label="Toggle theme" className="ml-3 rounded-full border border-black/10 bg-white/70 p-2 shadow-sm backdrop-blur-md transition hover:border-black/20 dark:border-white/10 dark:bg-white/5">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Sections */}
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Estimator />
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 bg-white/60 py-10 dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10 lg:px-12">
          <p className="text-sm text-neutral-600 dark:text-neutral-300">© {new Date().getFullYear()} LuxSpace Interiors. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#services" className="hover:text-[#d4af37]">Services</a>
            <a href="#portfolio" className="hover:text-[#d4af37]">Portfolio</a>
            <a href="#estimator" className="hover:text-[#d4af37]">Estimator</a>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp CTA */}
      <a
        href="https://wa.me/919999999999?text=Hi%20I%20want%20a%20free%20interior%20consultation"
        className="fixed bottom-6 right-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}

export default App;
