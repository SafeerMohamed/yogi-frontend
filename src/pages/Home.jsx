import { motion } from 'framer-motion';
import { fadeUp } from '../animations/variants';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedCreators from '../components/home/FeaturedCreators';
import MasonryFeed from '../components/feed/MasonryFeed';
import { usePosts } from '../hooks/usePosts';

export default function Home() {
  const { posts, loading, hasMore, loadMore, total, removePost } = usePosts();

  return (
    <>
      <Hero />
      <Categories />

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-8 text-center sm:mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Explore <span className="gradient-text">Inspiration</span>
            </h2>
            <p className="mt-3 text-zinc-500">
              {total > 0 ? (
                <>
                  <span className="font-medium text-zinc-300">{total.toLocaleString()}+</span> pins in a
                  cinematic mosaic — scroll to discover
                </>
              ) : (
                'Curated pins in a Netflix-style layout'
              )}
            </p>
          </motion.div>
        </div>

        {/* Full-bleed bento grid */}
        <div className="w-full px-2 sm:px-4 md:px-5 lg:px-6">
          <MasonryFeed
            posts={posts}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            onPostDeleted={removePost}
          />
        </div>
      </section>

      <FeaturedCreators />
    </>
  );
}
