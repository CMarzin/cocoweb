import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const articles = await getCollection('articles');

  const allContent = [...posts, ...articles].sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const siteUrl = context.site?.toString() ?? 'https://cocoweb.fr';

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Cocoweb',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed/feed.json`,
    description: 'Voici mon blog où je poste ma veille technologique.',
    language: 'fr',
    authors: [
      {
        name: 'Corentin Marzin',
        url: `${siteUrl}/about/`,
      },
    ],
    items: allContent.map((item) => {
      const isArticle = articles.some((a) => a.id === item.id);
      const basePath = isArticle ? '/articles/' : '/blog/';
      const url = `${siteUrl}${basePath}${item.id}/`;

      return {
        id: url,
        url: url,
        title: item.data.title,
        summary: item.data.description,
        date_published: item.data.date.toISOString(),
        tags: item.data.tags,
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
    },
  });
}
