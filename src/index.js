/**
 * Cloudflare Worker - Hello World
 * Este worker responde con un mensaje simple
 */

export default {
  async fetch(request, env, ctx) {
    return new Response('Hello World!', {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
      },
    });
  },
};
