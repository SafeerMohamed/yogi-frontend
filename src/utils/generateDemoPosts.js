import { CATEGORIES } from './constants';

const ADJECTIVES = [
  'Stunning', 'Bold', 'Elegant', 'Vivid', 'Serene', 'Modern', 'Cinematic', 'Clean',
  'Dreamy', 'Urban', 'Golden', 'Neon', 'Refined', 'Epic', 'Soft', 'Fresh',
];

const NOUNS = {
  'UI/UX': ['Dashboard', 'Mobile UI', 'Design System', 'Landing Page'],
  Coding: ['Dev Setup', 'Code Flow', 'Terminal', 'Workspace'],
  Photography: ['Portrait', 'Landscape', 'Street Shot', 'Golden Hour'],
  Art: ['Canvas', 'Mural', 'Illustration', 'Composition'],
  Architecture: ['Facade', 'Skyline', 'Interior', 'Structure'],
  Minimal: ['White Space', 'Calm Room', 'Balance', 'Form'],
  Fashion: ['Editorial', 'Street Style', 'Lookbook', 'Campaign'],
  '3D Design': ['Render', 'Mesh', 'Scene', 'Concept'],
};

const CREATORS = [
  'alexdesign', 'sarahm', 'mikearch', 'lenscraft', 'artflow', 'stylehub', 'renderlab', 'devnova',
];

const PINS_PER_CATEGORY = 50;

function imageFor(catIndex, i) {
  const id = ((catIndex * 57 + i * 3) % 1050) + 1;
  const h = 420 + (i % 8) * 90;
  return `https://picsum.photos/id/${id}/600/${h}`;
}

let cachedAll = null;

export function getAllDemoPosts() {
  if (cachedAll) return cachedAll;

  const posts = [];
  CATEGORIES.forEach((cat, catIndex) => {
    for (let i = 0; i < PINS_PER_CATEGORY; i++) {
      const adj = ADJECTIVES[i % ADJECTIVES.length];
      const noun = NOUNS[cat.slug][i % NOUNS[cat.slug].length];
      posts.push({
        _id: `demo-${cat.slug}-${i}`,
        title: `${adj} ${noun} ${i + 1}`,
        category: cat.slug,
        image: imageFor(catIndex, i),
        likes: Array((i % 5) + 1).fill(null),
        createdBy: { username: CREATORS[i % CREATORS.length], avatar: '' },
      });
    }
  });

  cachedAll = posts;
  return posts;
}

export function filterDemoPosts({ category, search } = {}) {
  let list = getAllDemoPosts();
  if (category) list = list.filter((p) => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }
  return list;
}

export function paginateDemoPosts(list, page, limit = 20) {
  const start = (page - 1) * limit;
  return {
    posts: list.slice(start, start + limit),
    pages: Math.ceil(list.length / limit),
    total: list.length,
  };
}
