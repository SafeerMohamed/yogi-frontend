import { AnimatePresence } from 'framer-motion';
import MasonryCard from './MasonryCard';
import { useBentoViewport } from '../../hooks/useBentoViewport';
import { getBentoLayout } from '../../utils/bentoLayout';

export default function BentoGrid({ posts, onPostDeleted }) {
  const viewport = useBentoViewport();
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <div className={`bento-grid bento-grid--${viewport}`}>
      <AnimatePresence mode="popLayout">
        {safePosts.map((post, i) => (
          <MasonryCard
            key={post._id}
            post={post}
            index={i}
            layout={getBentoLayout(i, viewport)}
            onDeleted={onPostDeleted}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
