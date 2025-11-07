import { motion } from 'framer-motion';
import { Paintbrush, Hammer, Plug, Ruler, Building2, BedDouble, LampDesk, Layers } from 'lucide-react';

const services = [
  { title: 'Interior Designing', icon: Ruler, desc: 'Concept to execution with bespoke materials and finish.' },
  { title: 'Modular Kitchen', icon: LampDesk, desc: 'Premium modular systems crafted to millimeter precision.' },
  { title: 'Civil Work', icon: Building2, desc: 'Structural modifications, flooring, and turnkey execution.' },
  { title: 'False Ceiling', icon: Layers, desc: 'Layered ceilings with profile lighting and acoustic comfort.' },
  { title: 'Electrical Work', icon: Plug, desc: 'Smart lighting, concealed wiring, and automation-ready.' },
  { title: 'Painting', icon: Paintbrush, desc: 'Luxury emulsion finishes with dust-free process.' },
  { title: 'Vastu Consultation', icon: BedDouble, desc: 'Balanced layouts aligned with vastu sciences.' },
  { title: 'Renting + Manpower', icon: Hammer, desc: 'Property renting and managed workforce solutions.' },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[#1e1e1e] md:text-4xl dark:text-white">Our Services</h2>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-300">Everything you need from design to delivery—managed by one expert team.</p>
          </div>
          <a href="https://wa.me/919999999999" className="hidden rounded-full border border-black/10 px-4 py-2 text-sm text-[#1e1e1e] hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black md:block">Chat on WhatsApp</a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group rounded-2xl border border-black/10 bg-[#f8f8f8] p-6 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-[#e3dccd] p-3 text-[#1e1e1e] dark:bg-white/10 dark:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#1e1e1e] dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{s.desc}</p>
              <button className="mt-4 text-sm font-medium text-[#d4af37] hover:underline">View details</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
