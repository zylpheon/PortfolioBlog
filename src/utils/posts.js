// Eagerly load all MDX post modules
const modules = import.meta.glob('../content/posts/*.mdx', { eager: true })

function slugFromPath(path) {
  return path.replace('../content/posts/', '').replace('.mdx', '')
}

/**
 * Returns all posts sorted by date descending.
 * Each post: { slug, component, title, date, excerpt, tags, readTime, featured }
 */
export function getAllPosts() {
  return Object.entries(modules)
    .map(([path, mod]) => ({
      slug: slugFromPath(path),
      component: mod.default,
      ...(mod.frontmatter || {}),
    }))
    .filter(p => p.title) // skip files without frontmatter
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

/**
 * Returns a single post by slug, or null if not found.
 */
export function getPost(slug) {
  const entry = Object.entries(modules).find(
    ([path]) => slugFromPath(path) === slug
  )
  if (!entry) return null
  const [, mod] = entry
  return {
    slug,
    component: mod.default,
    ...(mod.frontmatter || {}),
  }
}

/**
 * Returns all unique tags across all posts.
 */
export function getAllTags() {
  const posts = getAllPosts()
  const set = new Set()
  posts.forEach(p => (p.tags || []).forEach(t => set.add(t)))
  return Array.from(set).sort()
}

/**
 * Returns adjacent posts (prev / next) relative to a given slug.
 */
export function getAdjacentPosts(slug) {
  const posts = getAllPosts()
  const idx = posts.findIndex(p => p.slug === slug)
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  }
}
