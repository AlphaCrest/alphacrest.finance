// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://alphacrest.finance',
  integrations: [sitemap()],
  // Warm the next page on hover so cross-document view transitions feel instant
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  // Self-hosted, subsetted fonts with metric-matched fallbacks (no third-party requests at runtime)
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: ['300 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['serif'],
      options: {
        experimental: {
          // Optical sizing gives display sizes their high-contrast cut
          variableAxis: { opsz: [['9', '144']] },
        },
      },
    },
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      weights: ['300 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: ['400 600'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['monospace'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
