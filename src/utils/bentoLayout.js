/** Netflix-style tile patterns: { col, row } spans on a 12-column grid */

export const DESKTOP_PATTERNS = [
  { col: 8, row: 3 },  // cinematic wide
  { col: 4, row: 3 },  // tall poster
  { col: 4, row: 2 },
  { col: 4, row: 2 },
  { col: 6, row: 2 },  // horizontal strip
  { col: 3, row: 4 },  // vertical feature
  { col: 3, row: 2 },
  { col: 3, row: 2 },
  { col: 3, row: 2 },
  { col: 5, row: 3 },
  { col: 7, row: 2 },
  { col: 4, row: 4 },  // large portrait
  { col: 6, row: 3 },
  { col: 6, row: 2 },
  { col: 3, row: 3 },
  { col: 3, row: 3 },
];

export const TABLET_PATTERNS = [
  { col: 6, row: 2 },
  { col: 3, row: 3 },
  { col: 3, row: 2 },
  { col: 4, row: 2 },
  { col: 5, row: 2 },
  { col: 3, row: 3 },
  { col: 4, row: 2 },
  { col: 2, row: 2 },
];

export const MOBILE_PATTERNS = [
  { col: 4, row: 2 },
  { col: 2, row: 3 },
  { col: 2, row: 2 },
  { col: 2, row: 2 },
  { col: 4, row: 2 },
  { col: 2, row: 3 },
  { col: 2, row: 2 },
  { col: 2, row: 2 },
];

export function getBentoLayout(index, viewport = 'desktop') {
  const patterns =
    viewport === 'mobile'
      ? MOBILE_PATTERNS
      : viewport === 'tablet'
        ? TABLET_PATTERNS
        : DESKTOP_PATTERNS;

  const { col, row } = patterns[index % patterns.length];

  return {
    gridColumn: `span ${col}`,
    gridRow: `span ${row}`,
  };
}

export function getViewport(width) {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}
