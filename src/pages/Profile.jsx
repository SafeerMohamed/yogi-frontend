import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiGrid, FiBookmark } from 'react-icons/fi';
import { usersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { fadeUp } from '../animations/variants';
import { getImageUrl, formatCount } from '../utils/helpers';
import Avatar from '../components/ui/Avatar';
import MasonryFeed from '../components/feed/MasonryFeed';

export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(() => {
    setLoading(true);
    usersAPI
      .getProfile()
      .then(({ data }) => setProfile(data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile, user]);

  const handlePostDeleted = (id) => {
    setProfile((prev) => {
      if (!prev) return prev;
      const wasInPosts = prev.posts?.some((p) => p._id === id);
      return {
        ...prev,
        posts: (prev.posts || []).filter((p) => p._id !== id),
        saved: (prev.saved || []).filter((p) => p._id !== id),
        stats: {
          ...prev.stats,
          posts: wasInPosts ? Math.max(0, (prev.stats?.posts || 0) - 1) : prev.stats?.posts,
          saved: (prev.saved || []).length,
        },
      };
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  const displayUser = profile?.user || user;
  const posts = tab === 'posts' ? profile?.posts || [] : profile?.saved || [];
  const stats = profile?.stats || { posts: 0, followers: 0, following: 0, saved: 0 };

  return (
    <div className="min-h-screen pb-24">
      <div className="relative h-48 sm:h-64">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900/50 to-[#0a0a0b]" />
        {displayUser?.banner && (
          <img
            src={getImageUrl(displayUser.banner)}
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="-mt-16 flex flex-col items-center gap-6 sm:flex-row sm:items-end"
        >
          <Avatar src={displayUser?.avatar} name={displayUser?.username} size="xl" className="ring-4 ring-[#0a0a0b]" />
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-display text-3xl font-bold text-white">
              @{displayUser?.username}
            </h1>
            <p className="mt-2 max-w-lg text-zinc-400">
              {displayUser?.bio || 'Creative explorer on Zuntrist ✨'}
            </p>
            <div className="mt-4 flex justify-center gap-8 sm:justify-start">
              {[
                { label: 'Pins', value: stats.posts },
                { label: 'Followers', value: stats.followers },
                { label: 'Following', value: stats.following },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-xl font-bold text-white">
                    {formatCount(s.value)}
                  </div>
                  <div className="text-sm text-zinc-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex gap-2 border-b border-white/10">
          {[
            { id: 'posts', label: 'Pins', icon: FiGrid },
            { id: 'saved', label: 'Saved', icon: FiBookmark },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                tab === id
                  ? 'border-purple-500 text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="-mx-2 mt-8 sm:-mx-4">
          {posts.length > 0 ? (
            <MasonryFeed
              posts={posts}
              loading={false}
              hasMore={false}
              loadMore={() => {}}
              onPostDeleted={handlePostDeleted}
            />
          ) : (
            <p className="py-16 text-center text-zinc-500">
              {tab === 'posts' ? 'No pins yet. Create your first pin!' : 'No saved pins yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
