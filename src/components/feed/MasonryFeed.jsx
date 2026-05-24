import InfiniteScroll from 'react-infinite-scroll-component';
import BentoGrid from './BentoGrid';
import { BentoSkeleton } from '../ui/Skeleton';

export default function MasonryFeed({ posts, loading, hasMore, loadMore, onPostDeleted }) {
  if (loading && posts.length === 0) {
    return <BentoSkeleton count={14} />;
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-zinc-400">No pins found</p>
        <p className="mt-2 text-sm text-zinc-600">Try another category or create your first pin</p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={loadMore}
      hasMore={hasMore}
      loader={
        <div className="py-10 text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          <p className="mt-3 text-sm text-zinc-500">Loading more inspiration...</p>
        </div>
      }
      endMessage={
        posts.length > 0 && (
          <p className="py-10 text-center text-sm text-zinc-500">
            You&apos;ve explored everything — for now ✨
          </p>
        )
      }
    >
      <BentoGrid posts={posts} onPostDeleted={onPostDeleted} />
    </InfiniteScroll>
  );
}
