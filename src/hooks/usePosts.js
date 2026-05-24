import { useState, useEffect, useCallback } from 'react';
import { postsAPI } from '../services/api';
import { filterDemoPosts, paginateDemoPosts } from '../utils/generateDemoPosts';

const PAGE_SIZE = 20;

export const usePosts = (params = {}) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [usingDemo, setUsingDemo] = useState(false);

  const category = params.category || '';
  const search = params.search || '';
  const user = params.user || '';

  const fetchPosts = useCallback(
    async (pageNum = 1, reset = false) => {
      try {
        if (reset) setLoading(true);

        const { data } = await postsAPI.getAll({
          category: category || undefined,
          search: search || undefined,
          user: user || undefined,
          page: pageNum,
          limit: PAGE_SIZE,
        });

        const newPosts = data.posts || [];
        setUsingDemo(false);
        setTotal(data.total || 0);
        setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));
        setHasMore(pageNum < (data.pages || 1));
      } catch {
        const filtered = filterDemoPosts({ category, search });
        const { posts: demoPage, pages, total: demoTotal } = paginateDemoPosts(
          filtered,
          pageNum,
          PAGE_SIZE
        );
        setUsingDemo(true);
        setTotal(demoTotal);
        setPosts((prev) => (reset ? demoPage : [...prev, ...demoPage]));
        setHasMore(pageNum < pages);
      } finally {
        setLoading(false);
      }
    },
    [category, search, user]
  );

  useEffect(() => {
    setPage(1);
    fetchPosts(1, true);
  }, [fetchPosts]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPosts(next, false);
  };

  const removePost = (id) => {
    setPosts((prev) => prev.filter((p) => p._id !== id));
    setTotal((t) => Math.max(0, t - 1));
  };

  const refetch = () => {
    setPage(1);
    fetchPosts(1, true);
  };

  return {
    posts,
    loading,
    hasMore,
    loadMore,
    total,
    usingDemo,
    removePost,
    refetch,
  };
};
