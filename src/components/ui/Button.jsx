import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
  secondary:
    'glass text-white hover:bg-white/10',
  ghost: 'text-zinc-300 hover:text-white hover:bg-white/5',
  outline:
    'border border-white/20 text-white hover:border-purple-500/50 hover:bg-purple-500/10',
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ${variants[variant]} ${className}`;

  if (Component === 'span' || Component === 'div') {
    return <Component className={classes} {...props}>{children}</Component>;
  }

  const MotionComp = Component || motion.button;
  return (
    <MotionComp
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
