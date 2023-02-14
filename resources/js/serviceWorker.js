// importScripts(
//   'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
// );
import { CacheFirst } from 'workbox-strategies/CacheFirst';
import { registerRoute } from 'workbox-routing/registerRoute';

(() => {
  'use strict';

  registerRoute(
    /\.(?:png|jpg|jpeg|svg)$/,
    new CacheFirst({
      cacheName: 'images1',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 20,
          purgeOnQuotaError: true,
        }),
      ]
    }));
})

