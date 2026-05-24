import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { CATEGORIES } from '../../utils/constants';

export default function Categories() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Trending <span className="gradient-text">Categories</span>
          </h2>
          <p className="mt-3 text-zinc-500">Explore what&apos;s hot right now</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.slug} variants={fadeUp} custom={i}>
              <Link
                to={`/explore?category=${encodeURIComponent(cat.slug)}`}
                className="group relative block h-48 w-44 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-52"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-lg font-bold text-white">{cat.name}</h3>
                  <p className="mt-1 text-xs text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
