import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiX } from 'react-icons/fi';

export default function DeletePinModal({ open, title, loading, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[min(100%,24rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onCancel}
              className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <FiX className="h-5 w-5" />
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
              <FiTrash2 className="h-6 w-6" />
            </div>

            <h3 className="font-display text-xl font-bold text-white">Delete this pin?</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              &ldquo;{title}&rdquo; will be removed permanently. This cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 rounded-full border border-white/10 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <FiTrash2 className="h-4 w-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
