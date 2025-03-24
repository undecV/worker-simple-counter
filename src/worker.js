export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const counterName = url.searchParams.get('name');

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight (OPTIONS) requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...corsHeaders },
      });
    }

    if (!counterName) {
      return new Response('Missing "name" query parameter', {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
      });
    }

    if (!env.COUNTERS) {
      return new Response('KV binding is missing!', {
        status: 500,
        headers: { ...corsHeaders },
      });
    }

    let count = await env.COUNTERS.get(counterName);
    if (!count) count = '0';

    const currentCount = parseInt(count) + 1;
    await env.COUNTERS.put(counterName, currentCount.toString());

    return new Response(currentCount.toString(), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  },
};
