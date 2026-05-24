import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiImage } from 'react-icons/fi';
import { postsAPI } from '../services/api';
import { CATEGORIES } from '../utils/constants';
import { fadeUp } from '../animations/variants';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function CreatePost() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('UI/UX');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (f) => {
    if (f && f.type.startsWith('image/')) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const clearImage = () => {
    setFile(null);
    setPreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload an image');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('tags', tags);
      const { data } = await postsAPI.create(formData);
      navigate(`/post/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <h1 className="font-display text-4xl font-bold text-white">
            Create a <span className="gradient-text">Pin</span>
          </h1>
          <p className="mt-2 text-zinc-500">Share your creative vision with the world</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {!preview ? (
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed p-16 text-center transition-all ${
                  dragActive
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-white/20 bg-white/[0.02] hover:border-purple-500/50 hover:bg-white/[0.04]'
                }`}
              >
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <motion.div
                  animate={dragActive ? { scale: 1.05 } : { scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
                    <FiUploadCloud className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {dragActive ? 'Drop your image here' : 'Drag & drop your image'}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">or click to browse • PNG, JPG, WEBP up to 10MB</p>
                </motion.div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-3xl">
                <img src={preview} alt="Preview" className="max-h-96 w-full object-cover" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}

            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your pin a catchy title"
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell the story behind your creation..."
                rows={4}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-400">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-zinc-900">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="design, ui, minimal (comma separated)"
              icon={FiImage}
            />

            <Button type="submit" className="w-full !py-4" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Pin'}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
