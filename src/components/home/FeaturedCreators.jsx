import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUserPlus } from 'react-icons/fi';
import { usersAPI } from '../../services/api';
import { fadeUp, staggerContainer } from '../../animations/variants';
import { formatCount } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

const DEMO_CREATORS = [
  { _id: '1', username: 'alexdesign', bio: 'UI/UX Designer', followers: [1, 2, 3, 4, 5] },
  { _id: '2', username: 'sarahm', bio: 'Minimal Artist', followers: [1, 2, 3] },
  { _id: '3', username: 'mikearch', bio: 'Architect & Visualizer', followers: [1, 2, 3, 4] },
  { _id: '4', username: 'lenscraft', bio: 'Photographer', followers: [1, 2, 3, 4, 5, 6] },
  { _id: '5', username: 'renderlab', bio: '3D Artist', followers: [1, 2] },
  { _id: '6', username: 'stylehub', bio: 'Fashion Curator', followers: [1, 2, 3, 4, 5, 6, 7] },
];

export default function FeaturedCreators() {
  const [creators, setCreators] = useState(DEMO_CREATORS);
  const [following, setFollowing] = useState({});

  useEffect(() => {
    usersAPI
      .getCreators()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length) setCreators(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Featured <span className="gradient-text">Creators</span>
          </h2>
          <p className="mt-3 text-zinc-500">Follow the best minds in design</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(Array.isArray(creators) ? creators : DEMO_CREATORS).map((creator, i) => (
            <motion.div
              key={creator._id || creator.username}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-purple-500/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar src={creator.avatar} name={creator.username} size="lg" />
                  <div>
                    <h3 className="font-semibold text-white">@{creator.username}</h3>
                    <p className="mt-0.5 text-sm text-zinc-500 line-clamp-1">
                      {creator.bio || 'Creative professional'}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      {formatCount(creator.followers?.length || 0)} followers
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant={following[creator._id] ? 'secondary' : 'primary'}
                className="mt-5 w-full !py-2.5 !text-sm"
                onClick={() =>
                  setFollowing((f) => ({ ...f, [creator._id]: !f[creator._id] }))
                }
              >
                <FiUserPlus className="h-4 w-4" />
                {following[creator._id] ? 'Following' : 'Follow'}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
