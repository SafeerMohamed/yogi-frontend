import { useBentoViewport } from '../../hooks/useBentoViewport';
import { getBentoLayout } from '../../utils/bentoLayout';

export function SkeletonCard() {
  return <div className="skeleton absolute inset-0 rounded-2xl" />;
}

export function BentoSkeleton({ count = 14 }) {
  const viewport = useBentoViewport();

  return (
    <div className={`bento-grid bento-grid--${viewport}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={getBentoLayout(i, viewport)}
          className="relative min-h-[140px]"
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

/** @deprecated use BentoSkeleton */
export function MasonrySkeleton(props) {
  return <BentoSkeleton {...props} />;
}
