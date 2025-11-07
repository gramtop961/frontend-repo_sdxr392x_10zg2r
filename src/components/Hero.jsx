import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#f8f8f8] dark:bg-[#0f0f10]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/8h1A1EGkDaXHBIys/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f8f8f8]/80 via-transparent to-[#e3dccd]/60 dark:from-[#0f0f10]/85 dark:via-transparent dark:to-black/60" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-24 md:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium tracking-wide text-[#1e1e1e] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
            Premium Interior Design • Turnkey Execution
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-[#1e1e1e] sm:text-5xl md:text-6xl dark:text-white">
            Futuristic, minimal, and crafted for modern living.
          </h1>

          <p className="mt-6 text-base text-neutral-600 md:text-lg dark:text-neutral-300">
            Elevate your space with award-winning designers. Bespoke interiors, seamless construction, and curated materials—delivered with precision.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/919999999999?text=Hi%20I%20want%20a%20free%20interior%20consultation"
              className="group inline-flex items-center gap-2 rounded-full bg-[#1e1e1e] px-6 py-3 text-white transition hover:shadow-lg dark:bg-white dark:text-black"
            >
              Get Free Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href="#portfolio" className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 py-3 text-[#1e1e1e] shadow-sm backdrop-blur-md transition hover:border-black/20 dark:border-white/10 dark:bg-white/5 dark:text-white">
              View Portfolio
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-[#d4af37] text-[#d4af37]" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Top-rated on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-[#d4af37] text-[#d4af37]" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">100+ projects delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-[#d4af37] text-[#d4af37]" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Vastu-informed designs</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6"
        >
          {[
            'Interior Designing',
            'Construction',
            'Property Renting',
            'Product Supply',
            'Vastu Consultancy',
            'Manpower Solutions',
          ].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-center text-xs text-neutral-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
