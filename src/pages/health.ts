import type { APIContext } from 'astro';

export async function GET({ site }: APIContext) {
  return new Response(JSON.stringify({ status: 'ok', site: site?.toString() ?? 'https://cocoweb.fr' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
