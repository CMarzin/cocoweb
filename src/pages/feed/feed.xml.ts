import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const articles = await getCollection('articles');

  // Combine and sort all content by date
  const allContent = [...posts, ...articles].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Cocoweb',
    description: 'Voici mon blog où je poste ma veille technologique.',
    site: context.site ?? 'https://cocoweb.fr',
    items: allContent.map((item) => {
      // Determine the correct URL based on collection
      const isArticle = articles.some((a) => a.slug === item.slug);
      const basePath = isArticle ? '/articles/' : '/blog/';

      return {
        title: item.data.title,
        pubDate: item.data.date,
        description: item.data.description,
        link: `${basePath}${item.slug}/`,
        categories: item.data.tags,
      };
    }),
    customData: `<language>fr</language>`,
  });
}
