import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiBookmark, FiSend, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { postsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getImageUrl, formatCount } from '../utils/helpers';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import MasonryFeed from '../components/feed/MasonryFeed';
import DeletePinModal from '../components/ui/DeletePinModal';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const [{ data: postData }, { data: relatedData }] = await Promise.all([
          postsAPI.getOne(id),
          postsAPI.getRelated(id),
        ]);
        setPost(postData);
        setRelated(relatedData);
        setLiked(postData.likes?.some((l) => String(l) === String(user?._id) || l?._id === user?._id));
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user?._id]);

  const ownerId = post?.createdBy?._id || post?.createdBy;
  const isOwner = isAuthenticated && user?._id && ownerId && String(user._id) === String(ownerId);

  const handleLike = async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await postsAPI.like(id);
      setLiked(data.liked);
      setPost((p) => ({ ...p, likes: Array(data.likes).fill(user._id) }));
    } catch {
      setLiked(!liked);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) return;
    try {
      const { data } = await postsAPI.save(id);
      setSaved(data.saved);
    } catch {
      setSaved(!saved);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !isAuthenticated) return;
    try {
      const { data } = await postsAPI.comment(id, comment);
      setPost((p) => ({ ...p, comments: data }));
      setComment('');
    } catch {
      setPost((p) => ({
        ...p,
        comments: [
          ...(p.comments || []),
          {
            text: comment,
            user: { username: user?.username, avatar: user?.avatar },
            createdAt: new Date(),
          },
        ],
      }));
      setComment('');
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await postsAPI.delete(id);
      navigate('/profile', { replace: true });
    } catch {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-24">
        <p className="text-zinc-500">Post not found</p>
        <Link to="/explore" className="mt-4 text-purple-400">
          Back to explore
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/explore"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <FiArrowLeft /> Back
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden rounded-3xl"
          >
            <img
              src={getImageUrl(post.image)}
              alt={post.title}
              className="w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar src={post.createdBy?.avatar} name={post.createdBy?.username} />
                <div>
                  <p className="font-semibold text-white">@{post.createdBy?.username}</p>
                  <p className="text-sm text-zinc-500">{post.category}</p>
                </div>
              </div>
              {isOwner && (
                <button
                  type="button"
                  onClick={() => setShowDelete(true)}
                  className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                >
                  <FiTrash2 className="h-4 w-4" />
                  Delete
                </button>
              )}
            </div>

            <h1 className="mt-6 font-display text-3xl font-bold text-white">{post.title}</h1>
            {post.description && (
              <p className="mt-4 leading-relaxed text-zinc-400">{post.description}</p>
            )}

            {post.tags?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                variant={liked ? 'primary' : 'secondary'}
                onClick={handleLike}
                className="!px-5"
              >
                <FiHeart className={liked ? 'fill-current' : ''} />
                {formatCount(post.likes?.length || 0)}
              </Button>
              <Button variant={saved ? 'primary' : 'secondary'} onClick={handleSave} className="!px-5">
                <FiBookmark className={saved ? 'fill-current' : ''} />
                Save
              </Button>
              <Button variant="ghost" className="!px-5">
                <FiSend /> Share
              </Button>
            </div>

            <div className="mt-8 flex-1">
              <h3 className="mb-4 font-semibold text-white">
                Comments ({post.comments?.length || 0})
              </h3>
              <div className="max-h-64 space-y-4 overflow-y-auto">
                {post.comments?.map((c, i) => (
                  <div key={c._id || i} className="flex gap-3">
                    <Avatar src={c.user?.avatar} name={c.user?.username} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-white">@{c.user?.username}</p>
                      <p className="text-sm text-zinc-400">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              {isAuthenticated && (
                <form onSubmit={handleComment} className="mt-4 flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500"
                  />
                  <Button type="submit" className="!px-5">
                    Post
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 font-display text-2xl font-bold text-white">More like this</h2>
            <div className="-mx-2 sm:-mx-4">
              <MasonryFeed
                posts={related}
                loading={false}
                hasMore={false}
                loadMore={() => {}}
              />
            </div>
          </section>
        )}
      </div>

      <DeletePinModal
        open={showDelete}
        title={post.title}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => !deleting && setShowDelete(false)}
      />
    </div>
  );
}
