// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  target: 'static',

  devServer: {
    port: 3210
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/import.scss" as *;'
        }
      }
    }
  },

  css: [
    '@/assets/css/normalize.scss',
    '@/assets/css/base.scss'
  ],

  app: {
    head: {
      title: 'Bitcoin Designathon 2025',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#f2a900' },
        { name: 'theme-color', content: '#f2a900' },
  
        { property: 'og:title', content: 'Bitcoin Designathon 2025' },
  
        { hid: 'description', name: 'description', content:"We are getting creative with bitcoin. From May 4 to 18, 2025." },
        { name: 'description', content: "We are getting creative with bitcoin. From May 4 to 18, 2025." },
        { property: 'og:description', content: "We are getting creative with bitcoin. From May 4 to 18, 2025." },
  
        { property: 'og:url', content: 'https://event.bitcoin.design' },
        { property: 'og:site_name', content: 'Bitcoin Designathon 2025' },
        { property: 'og:image', content: '/preview.jpg' },
  
        { name: 'twitter:card', content: 'summary' },
        { property: 'twitter:image', content: '/preview.jpg' },
        { property: 'twitter:title', content: 'Bitcoin Designathon 2025' },
        { name: 'twitter:site', content: '@bitcoin_design' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', size: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', size: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#f2a900', href: '/assets/safari-pinned-tab.svg' },
      ],
      script: [
        { defer: true, src:"https://info.bitcoin.design/script.js", "data-website-id": "1fbc2d6d-0ffd-44f3-8468-59bb61a248fe" }
      ]
    },
  },

  modules: ['@nuxtjs/mdc'],

  runtimeConfig: {
    USE_DUMMY_DATA: process.env.USE_DUMMY_DATA,
    public: {}
  },

  hooks: {
    async 'build:before'() {
      const { $fetch } = await import('ofetch')
      const { writeFileSync } = await import('fs')

      const ideas = await $fetch('https://api.airtable.com/v0/appAR943q3FpYsoDk/Ideas', {
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}` }
      })
      writeFileSync('assets/data/ideas.json', JSON.stringify(ideas.records))

      const projects = await $fetch('https://api.airtable.com/v0/appAR943q3FpYsoDk/Projects', {
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}` }
      })
      writeFileSync('assets/data/projects.json', JSON.stringify(projects.records))

      const schedule = await $fetch('https://api.airtable.com/v0/appAR943q3FpYsoDk/Schedule', {
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}` }
      })
      writeFileSync('assets/data/schedule.json', JSON.stringify(schedule.records))
    }
  },

  mdc: {
    headings: {
      anchorLinks: false
    }
  }
})