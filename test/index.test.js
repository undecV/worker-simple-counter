import { describe, it, expect } from 'vitest';
import { env, SELF } from 'cloudflare:test';

describe('Counter Worker', () => {
  it('increments a counter', async () => {
    const name = 'test-counter';

    await env.COUNTERS.delete(name);

    const first = await SELF.fetch(`https://example.com/?name=${name}`);
    expect(first.status).toBe(200);
    expect(await first.text()).toBe('1');

    const second = await SELF.fetch(`https://example.com/?name=${name}`);
    expect(second.status).toBe(200);
    expect(await second.text()).toBe('2');
  });

  it('returns 400 when name is missing', async () => {
    const response = await SELF.fetch('https://example.com/');

    expect(response.status).toBe(400);
    expect(await response.text()).toBe('Missing "name" query parameter');
  });

  it('handles CORS preflight', async () => {
    const response = await SELF.fetch('https://example.com/', {
      method: 'OPTIONS',
    });

    expect(response.status).toBe(204);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });

  it('returns 404 for unknown routes', async () => {
    const response = await SELF.fetch('https://example.com/unknown');

    expect(response.status).toBe(404);
  });
});
