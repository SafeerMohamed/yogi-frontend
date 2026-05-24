export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-zinc-400">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
        )}
        <input
          className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-zinc-500 transition-all focus:border-purple-500/50 focus:bg-white/[0.07] ${Icon ? 'pl-12' : ''} ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
