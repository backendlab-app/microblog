const btoa = require('btoa')
require('dotenv').config()

const masterUser = process.env.ADMIN_USER
const masterPass = process.env.ADMIN_PASS

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'microblog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'BackendLab sample microblog platform' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  env: {
    API_ROOT: `https://api.backendlab.app/`,
    CUSTOMER_ID: process.env.CUSTOMER_ID,
    AUTH_STRING: 'Basic ' + btoa(`${masterUser}:${masterPass}`)
  },
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
