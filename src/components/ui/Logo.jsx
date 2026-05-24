import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <motion.div
        whileHover={{ rotate: 10, scale: 1.05 }}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
          <path d="M12 2L4 20h16L12 2z" opacity="0.9" />
        </svg>
      </motion.div>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Zun<span className="gradient-text">trist</span>
      </span>
    </Link>
  );
}
