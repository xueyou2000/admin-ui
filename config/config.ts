import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV, NODE_ENV } = process.env;

export default defineConfig({
  esbuild: {},
  chainWebpack: function(config, { webpack }) {
    config.merge({
      optimization: {
        minimize: NODE_ENV === 'production',
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              name: 'vendors',
              test({ resource }: any) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
  },
  scripts:
    NODE_ENV === 'development'
      ? [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
        ]
      : [
          'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
          'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
        ],
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false,
  },
  antd: {},
  dva: {
    immer: true,
    hmr: false,
  },
  request: {
    dataField: 'res',
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  ignoreMomentLocale: true,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  devServer: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  define: {
    'process.env.HTTP_BASE_URL': '/api',
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '@/layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '@/layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: 'user/login',
            },
            {
              component: './error/404',
            },
          ],
        },
        {
          path: '/',
          component: '@/layouts/BasicLayout',
          wrappers: ['@/layouts/SecurityLayout'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/welcome',
            },
            {
              path: '/dashboard/welcome',
              name: 'welcome',
              icon: 'dashboard',
              component: './dashboard/welcome',
            },
            {
              path: '/profile',
              icon: 'profile',
              name: 'profile',
              routes: [
                {
                  path: '/profile/settings',
                  name: 'settings',
                  icon: 'setting',
                  component: './profile/settings',
                },
              ],
            },
            {
              path: '/system',
              icon: 'setting',
              name: 'system',
              routes: [
                {
                  path: '/system/user',
                  name: 'user',
                  icon: 'user',
                  component: './dashboard/user',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/permission',
                  name: 'permission',
                  icon: 'menu',
                  component: './system/menu',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/role',
                  name: 'role',
                  icon: 'safety',
                  component: './dashboard/role',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/dept',
                  component: './system/dept',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/dict',
                  name: 'dict',
                  component: './system/dict',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/config',
                  component: './system/config',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/system/oss',
                  component: './system/oss',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  component: './error/404',
                },
              ],
            },
            {
              path: '/monitor',
              icon: 'video-camera',
              name: 'monitor',
              routes: [
                {
                  path: '/monitor/online',
                  component: './monitor/online',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/monitor/job',
                  component: './monitor/job',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/monitor/operLog',
                  component: './monitor/operLog',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
                {
                  path: '/monitor/loginLog',
                  component: './monitor/loginLog',
                  wrappers: ['@/components/KeepAliveWapper'],
                },
              ],
            },
            {
              component: './error/404',
            },
          ],
        },
      ],
    },
  ],
});
