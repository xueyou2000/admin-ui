import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;

export default defineConfig({
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
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  ignoreMomentLocale: true,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  devServer: {},
  proxy: proxy[REACT_APP_ENV || 'dev'],
  // umi routes: https://umijs.org/docs/routing
  routes: [{ path: '/', component: '@/pages/index' }],
});
