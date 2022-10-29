import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 3001
  },

   privateRuntimeConfig: {
    apiUrl: process.env.API_URL
  },

  auth: {
    plugins: [ '~/plugins/auth.js' ],
    strategies: {
      local: {
        token: {
          property: 'data.token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'data' },
          logout: false,
          user: false
        },
      }
    }
  },

  axios: {
    baseURL: process.env.API_URL,
  },

  router: {
    middleware: ['auth']
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Gestion des franchisés et des modules',
    title: 'GYM CLUB',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios.js', mode:'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#19344F',
          secondary: '#424242',
          accent: '#800080',
          error: '#B52838',
          info: '#82B1FF',
          success: '#24cfaa',
          warning: '#FFC107',
          background: '#e0e0e0',
          third: '#5685FF',
          fourth: '#EF64D9'
        },
        // light: {
        //   primary: '#19344F',
        //   secondary: '#225F9C',
        //   accent: '#082139',
        //   error: '#9C3832',
        //   info: '#2D9ACF',
        //   success: '#419C2A',
        //   warning: '#FFC107',
        //   background: '#e0e0e0',
        //   third: '#225F9C',
        //   fourth: '#EF64D9'
        // }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
