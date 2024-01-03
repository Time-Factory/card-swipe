import redisAdapter from "./server/db/redis";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'dayjs-nuxt',
    'nuxt3-socket.io',
    '@vant/nuxt',
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/global.css'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  dayjs: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    //defaultTimeZone: 'Asia/Shanghai',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },
  socket: {
    // JSON serializable options only.
    // options object to pass when instantiating socket server.
    addPlugin:false,
    serverOptions: {
      adapter: redisAdapter,
    }
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  devtools: { enabled: false }
})
