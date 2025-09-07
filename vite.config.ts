import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'BabyTrack - Track Your Baby\'s Journey',
      short_name: 'BabyTrack',
      description: 'Monitor your baby\'s feeding, sleeping, playing, and health activities with our beautiful and intuitive baby tracking app.',
      theme_color: '#2563eb',
      background_color: '#f9fafb',
      display: 'standalone',
      scope: '/',
      start_url: '/',
      categories: ['health', 'lifestyle', 'parenting'],
      icons: [
        {
          src: '/favicon.svg',
          sizes: 'any',
          type: 'image/svg+xml'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})