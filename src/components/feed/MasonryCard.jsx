import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiBookmark, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { postsAPI } from '../../services/api';
import { getImageUrl, formatCount } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import DeletePinModal from '../ui/DeletePinModal';

export default function MasonryCard({ post, index = 0, layout, onDeleted }) {
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(post.likes?.length || post.likes || 0);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const imageUrl = getImageUrl(post.image);
  const isDemo = String(post._id).startsWith('demo');
  const ownerId = post.createdBy?._id || post.createdBy;
  const isOwner = isAuthenticated && user?._id && ownerId && String(user._id) === String(ownerId);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated || isDemo) {
      setLiked(!liked);
      setLikes((l) => (liked ? l - 1 : l + 1));
      return;
    }
    try {
      const { data } = await postsAPI.like(post._id);
      setLiked(data.liked);
      setLikes(data.likes);
    } catch {
      setLiked(!liked);
      setLikes((l) => (liked ? l - 1 : l + 1));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated || isDemo) {
      setSaved(!saved);
      return;
    }
    try {
      const { data } = await postsAPI.save(post._id);
      setSaved(data.saved);
    } catch {
      setSaved(!saved);
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (isDemo) return;
    setDeleting(true);
    try {
      await postsAPI.delete(post._id);
      setShowDelete(false);
      onDeleted?.(post._id);
    } catch {
      setDeleting(false);
    }
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: (index % 6) * 0.04, ease: [0.22, 1, 0.36, 1] }}
        style={layout}
        className="bento-tile group/tile relative min-h-0"
      >
        <Link
          to={isDemo ? '/explore' : `/post/${post._id}`}
          className="block h-full min-h-[140px]"
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-lg shadow-black/30 ring-1 ring-white/5 transition-all duration-500 group-hover/tile:shadow-purple-500/10 group-hover/tile:ring-purple-500/20">
            <img
              src={imageUrl}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover/tile:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover/tile:opacity-100" />

            <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-md">
              {post.category}
            </span>

            {isOwner && !isDemo && (
              <button
                type="button"
                onClick={handleDeleteClick}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 shadow-lg backdrop-blur-md transition-all hover:bg-red-600 group-hover/tile:opacity-100"
                title="Delete pin"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            )}

            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <h3 className="line-clamp-2 font-semibold leading-snug text-white drop-shadow-lg">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center justify-between gap-2 opacity-0 transition-all duration-300 group-hover/tile:opacity-100">
                <div className="flex min-w-0 items-center gap-2">
                  <Avatar
                    src={post.createdBy?.avatar}
                    name={post.createdBy?.username}
                    size="sm"
                  />
                  <span className="truncate text-xs text-zinc-300 sm:text-sm">
                    @{post.createdBy?.username || 'creator'}
                  </span>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={handleLike}
                    className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all sm:h-9 sm:w-9 ${
                      liked
                        ? 'bg-pink-500/90 text-white'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <FiHeart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${liked ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all sm:h-9 sm:w-9 ${
                      saved
                        ? 'bg-purple-500/90 text-white'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    <FiBookmark className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-[11px] text-zinc-400 sm:text-xs">
                {formatCount(typeof likes === 'number' ? likes : likes?.length || 0)} likes
              </p>
            </div>
          </div>
        </Link>
      </motion.article>

      <DeletePinModal
        open={showDelete}
        title={post.title}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setShowDelete(false)}
      />
    </>
  );
}
