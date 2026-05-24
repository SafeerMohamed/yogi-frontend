import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { getAuthErrorMessage } from '../utils/authErrors';
import { fadeUp } from '../animations/variants';
import Input from '../components/ui/Input';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username.trim() || !email.trim() || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      setSuccess(true);
      setTimeout(() => navigate('/', { replace: true }), 600);
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible">
      <h1 className="font-display text-3xl font-bold text-white">Create account</h1>
      <p className="mt-2 text-zinc-500">Join Zuntrist and start sharing your creativity</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            <FiCheckCircle className="h-4 w-4 shrink-0" />
            Account created! Redirecting...
          </div>
        )}
        <Input
          label="Username"
          type="text"
          name="username"
          autoComplete="username"
          icon={FiUser}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourname"
          required
          minLength={3}
          disabled={loading}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={loading}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          icon={FiLock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 6 characters"
          required
          minLength={6}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || success}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-purple-400 hover:text-purple-300">
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}
