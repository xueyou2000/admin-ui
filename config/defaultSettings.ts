import { Settings } from '@ant-design/pro-layout';

/**
 * pro-layout 配置
 * @see https://procomponents.ant.design/components/layout#api
 */
const proSettings: Settings = {
  /** 导航的主题 */
  navTheme: 'dark',
  /** 菜单模式 */
  layout: 'side',
  /** 主题色 */
  primaryColor: '#1890ff',
  /** 内容布局方式 (Fluid=流体布局， Fixed固定布局) */
  contentWidth: 'Fluid',
  /** 是否固定Header */
  fixedHeader: false,
  /** 是否固定导航 */
  fixSiderbar: true,
  /** 菜单配置 */
  menu: {
    /** 菜单是否国际化 */
    locale: true,
  },
  /** 左上角标题 */
  title: 'XueYou Admin',
  iconfontUrl: '',
};

export default proSettings;
