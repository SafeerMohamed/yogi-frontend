import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import Logo from '../ui/Logo';

const links = {
  Product: [
    { label: 'Explore', to: '/explore' },
    { label: 'Create', to: '/create' },
    { label: 'Categories', to: '/explore' },
  ],
  Company: [
    { label: 'About', to: '/' },
    { label: 'Blog', to: '/' },
    { label: 'Careers', to: '/' },
  ],
  Legal: [
    { label: 'Privacy', to: '/' },
    { label: 'Terms', to: '/' },
  ],
};

const socials = [
  { icon: FiTwitter, href: '#' },
  { icon: FiInstagram, href: '#' },
  { icon: FiGithub, href: '#' },
  { icon: FiLinkedin, href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 bg-[#080809]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              Discover creative inspiration. Save ideas. Share creativity with the world&apos;s most aesthetic platform.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold text-white">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-sm text-zinc-500 transition-colors hover:text-purple-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Zuntrist. All rights reserved.
          </p>
          <p className="text-sm text-zinc-600">
            Crafted with <span className="text-pink-500">♥</span> for creators
          </p>
        </div>
      </div>
    </footer>
  );
}
