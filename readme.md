# Simple Counter for CloudFlare Worker

A minimalist backend counter implementation using Cloudflare Workers and KV storage. It's ideal for website stats, page view displays, or simple event counting.

> ⚠️ Warning: This project was designed for coursework purposes. Please review the source code carefully before using it in a production environment.

## 🚀 Features

- Stores counts using Cloudflare KV
- Automatically increments on each request
- Supports multiple counter names
- Full CORS support for cross-origin access
- Minimalist API, easy to integrate with frontend

## 🔧 Usage

```plain
GET https://your_worler.your_name.workers.dev/?name=YOUR_COUNTER_NAME
```

Returns a plain text (`text/plain`) number:

```plain
42
```

## Reference

- GitHub: [journey-ad/Moe-Counter](https://github.com/journey-ad/Moe-Counter)
- 琳的備忘手札: [網頁計數器徽章 View Counter Badge](https://xn--jgy.tw/SideProject/view-counter-badge-cloudflare-workers-d1/)
- GitHub: [jim60105/worker-view-counter-badge](https://github.com/jim60105/worker-view-counter-badge)
