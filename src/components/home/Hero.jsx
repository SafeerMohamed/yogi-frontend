import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { fadeUp, floatAnimation } from '../../animations/variants';
import { HERO_CARDS } from '../../utils/constants';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-pink-600/15 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[80px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {HERO_CARDS.map((card, i) => (
          <motion.div
            key={i}
            variants={floatAnimation}
            animate="animate"
            style={{ animationDelay: `${i * 0.5}s` }}
            className={`absolute hidden w-36 overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:block xl:w-44 ${card.x} ${card.y} ${card.rotate}`}
          >
            <img src={card.src} alt="" className={`w-full object-cover ${card.h}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300"
        >
          <FiZap className="h-4 w-4" />
          The future of creative discovery
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Discover{' '}
          <span className="gradient-text">Creative</span>
          <br />
          Inspiration
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl"
        >
          Save Ideas. Share Creativity. Explore millions of pins from the world&apos;s most talented creators.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link to="/explore">
            <Button className="group !px-8 !py-4 text-base">
              Explore Now
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/create">
            <Button variant="secondary" className="!px-8 !py-4 text-base">
              Start Creating
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-16 flex items-center justify-center gap-8 text-center"
        >
          {[
            { value: '2M+', label: 'Pins' },
            { value: '500K+', label: 'Creators' },
            { value: '50+', label: 'Categories' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1.5">
          <div className="mx-auto h-2 w-1 rounded-full bg-purple-400" />
        </div>
      </motion.div>
    </section>
  );
}
