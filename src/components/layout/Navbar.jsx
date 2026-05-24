import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBell, FiPlus, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useScrollNavbar } from '../../hooks/useScrollNavbar';
import Logo from '../ui/Logo';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function Navbar() {
  const scrolled = useScrollNavbar();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    setLoggedOut(true);
    navigate('/');
    setTimeout(() => setLoggedOut(false), 3000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/explore?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0a0a0b]/80 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      {loggedOut && (
        <div className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          You have been logged out
        </div>
      )}

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:block">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inspiration..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm text-white placeholder-zinc-500 transition-all focus:border-purple-500/40 focus:bg-white/[0.08]"
            />
          </div>
        </form>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/explore"
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
          >
            Explore
          </Link>
          {isAuthenticated && (
            <Link
              to="/create"
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <FiPlus className="h-4 w-4" />
              Create
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-zinc-400 lg:inline">
                Hi, <span className="text-white">{user?.username}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
              <button type="button" className="relative rounded-full p-2.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white">
                <FiBell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink-500" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="rounded-full ring-2 ring-transparent transition-all hover:ring-purple-500/50"
                  aria-label="Profile menu"
                >
                  <Avatar src={user?.avatar} name={user?.username} size="sm" />
                </button>
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 py-2 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="truncate text-sm font-semibold text-white">@{user?.username}</p>
                        <p className="truncate text-xs text-zinc-500">{user?.email}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        <FiUser className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        to="/create"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                      >
                        <FiPlus className="h-4 w-4" />
                        Create Pin
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        <FiLogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="!px-4 !py-2" as="span">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button className="!px-5 !py-2.5" as="span">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-zinc-400 md:hidden"
          aria-label="Menu"
        >
          {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#0a0a0b]/95 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-2 p-4">
              {isAuthenticated && (
                <div className="mb-2 rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white">@{user?.username}</p>
                  <p className="text-xs text-zinc-500">{user?.email}</p>
                </div>
              )}
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                />
              </form>
              <Link to="/explore" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5">
                Explore
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/create" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5">
                    Create
                  </Link>
                  <Link to="/profile" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5">
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-left text-red-400 hover:bg-red-500/10"
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-zinc-300 hover:bg-white/5">
                    Log in
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="block rounded-xl px-4 py-3 text-purple-400 hover:bg-white/5">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
