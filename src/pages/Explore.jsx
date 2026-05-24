import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLayers } from 'react-icons/fi';
import { fadeUp } from '../animations/variants';
import MasonryFeed from '../components/feed/MasonryFeed';
import { CATEGORIES } from '../utils/constants';
import { usePosts } from '../hooks/usePosts';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';

  const { posts, loading, hasMore, loadMore, total, removePost } = usePosts({ category, search });

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    setSearchParams(params);
  };

  const activeCat = CATEGORIES.find((c) => c.slug === category);

  return (
    <div className="min-h-screen pb-24 pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
          <h1 className="font-display text-4xl font-bold text-white">
            {search ? (
              <>Results for &ldquo;{search}&rdquo;</>
            ) : category ? (
              <>{category}</>
            ) : (
              'Explore'
            )}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-zinc-500">
            <span className="flex items-center gap-1.5">
              <FiLayers className="h-4 w-4 text-purple-400" />
              {total > 0 ? `${total.toLocaleString()} pins` : `${posts.length} loaded`}
            </span>
            {hasMore && posts.length > 0 && (
              <span className="text-xs text-zinc-600">· Mosaic layout · scroll for more</span>
            )}
          </div>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          <button
            type="button"
            onClick={() => setCategory('')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                : 'border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                category === cat.slug
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {activeCat && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-sm text-zinc-500"
          >
            {activeCat.name} — tiles adapt in size like a streaming catalog
          </motion.p>
        )}
      </div>

      <div className="w-full px-2 sm:px-4 md:px-5 lg:px-6">
        <MasonryFeed
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          loadMore={loadMore}
          onPostDeleted={removePost}
        />
      </div>
    </div>
  );
}
