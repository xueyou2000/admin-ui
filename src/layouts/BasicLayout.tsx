import logo from '@/assets/logo.svg';
import Authorized from '@/components/Authorized/Authorized';
import check from '@/components/Authorized/CheckPermissions';
import RightContent from '@/components/GlobalHeader/RightContent';
import icons from '@/config/icons';
import { GlobalModelState } from '@/models/global';
import NoAuthorizedPage from '@/pages/error/403';
import { queryCurrentMenus } from '@/services/UserService';
import { flatRoute, toHierarchyMenu, toLayourMenu, toMenuKey } from '@/utils/menu-utils';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  SettingDrawer,
  Settings,
} from '@ant-design/pro-layout';
import { getMatchMenu } from '@umijs/route-utils';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { connect, Dispatch, IRoute, Link, useIntl } from 'umi';
import styles from './BasecLayout.less';

interface BasicLayoutProps extends ProLayoutProps {
  settings: Settings;
  dispatch: Dispatch;
  routes: IRoute[];
}

/**
 * 实现菜单图标和无权限菜单隐藏
 */
function menuDataRender(menuList: MenuDataItem[]): MenuDataItem[] {
  return menuList.map(item => {
    const localItem = {
      ...item,
      icon: icons[item.icon as string],
      key: item.path,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return check(item.authority, localItem, localItem) as MenuDataItem;
  });
}

/**
 * 基础布局
 */
function BasicLayout(props: PropsWithChildren<BasicLayoutProps>) {
  const { dispatch, children, settings, location = { pathname: '/' }, routes } = props;
  const { formatMessage } = useIntl();
  const [menuData, setMenuData] = useState<MenuDataItem[]>([]);
  const [menuDataAndKey, setMenuDataAndKey] = useState<MenuDataItem[]>(menuData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 提取扁平路由
    dispatch({
      type: 'global/changeFlatRoute',
      payload: flatRoute(routes),
    });

    // 初始化获取菜单
    queryCurrentMenus().then(faltMenus => {
      const menus = toLayourMenu(toHierarchyMenu(faltMenus));
      setMenuData(menus);
      setMenuDataAndKey(toMenuKey(menus));
      setLoading(false);
    });
  }, []);

  // 当前页面授权配置
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataAndKey).pop() || {
        authority: undefined,
      },
    [menuDataAndKey, location.pathname],
  );

  const handleMenuCollapse = (payload: boolean): void => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });
  };

  return (
    <>
      <ProLayout
        className={styles.layout}
        logo={logo}
        loading={loading}
        menu={{
          loading,
        }}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        menuDataRender={() => menuDataRender(menuData)}
        // headerContentRender={() => <KeepAliveTabs />}
        rightContentRender={() => <RightContent />}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        {...props}
      >
        <Authorized authority={authorized.authority} noMatch={<NoAuthorizedPage />}>
          {children}
        </Authorized>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={config =>
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          })
        }
      />
    </>
  );
}

export default connect(({ global, settings }: { global: GlobalModelState; settings: Settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
