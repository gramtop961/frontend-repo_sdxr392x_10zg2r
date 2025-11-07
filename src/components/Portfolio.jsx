import { motion } from 'framer-motion';

const categories = ['All', '1BHK', '2BHK', '3BHK', 'Commercial'];
const gallery = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c592?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1400&auto=format&fit=crop',
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-[#f8f8f8] dark:bg-[#0f0f10]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold text-[#1e1e1e] md:text-4xl dark:text-white">Signature Portfolio</h2>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-300">Curated spaces that blend form, function, and timeless elegance.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto rounded-full border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5">
            {categories.map((c) => (
              <button key={c} className="rounded-full px-4 py-2 text-sm text-[#1e1e1e] transition hover:bg-[#e3dccd] dark:text-white dark:hover:bg-white/10">{c}</button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((src, idx) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt="Interior project"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
