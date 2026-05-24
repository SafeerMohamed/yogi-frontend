import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../animations/variants';
import Logo from '../components/ui/Logo';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-[#0a0a0b] to-pink-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/30 blur-[100px]" />
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="relative z-10">
          <h2 className="font-display text-4xl font-bold leading-tight text-white xl:text-5xl">
            Where creativity
            <br />
            <span className="gradient-text">comes alive</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-zinc-400">
            Join millions of creators sharing inspiration, ideas, and visual stories.
          </p>
        </div>
        <p className="relative z-10 text-sm text-zinc-600">
          &copy; Zuntrist — Pinterest Inspired Platform
        </p>
      </motion.div>

      <motion.div
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col items-center justify-center bg-[#0a0a0b] px-6 py-12 lg:w-1/2"
      >
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
        <p className="mt-8 text-center text-sm text-zinc-600">
          <Link to="/" className="text-purple-400 hover:text-purple-300">
            ← Back to home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
