/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // '/captcha': {
    //   target: 'http://antdv.totinlink.com',
    //   changeOrigin: true,
    //   pathRewrite: { '^/': '/api/' },
    // },
    // '/captcha': {
    //   target: 'http://192.168.1.26:8053',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },
    // '/api/': {
    //   target: 'http://192.168.1.26:8053',
    //   changeOrigin: true,
    //   pathRewrite: { '^/api/': '' },
    // },
    // '/file/': {
    //   target: 'http://192.168.1.26:8053',
    //   changeOrigin: true,
    //   pathRewrite: { '^': '' },
    // },

    '/captcha': {
      target: 'http://192.168.1.138:8053',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/api/': {
      target: 'http://192.168.1.138:8053',
      changeOrigin: true,
      pathRewrite: { '^/api/': '' },
    },
    '/file/': {
      target: 'http://192.168.1.138:8053',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
