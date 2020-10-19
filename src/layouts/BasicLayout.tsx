import logo from '@/assets/logo.svg';
import Authorized from '@/components/Authorized/Authorized';
import check from '@/components/Authorized/CheckPermissions';
import { GlobalModelState } from '@/models/global';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  SettingDrawer,
  Settings,
} from '@ant-design/pro-layout';
import { getMatchMenu } from '@umijs/route-utils';
import { Result } from 'antd';
import { ProSettings } from '../../config/defaultSettings';
import React, { PropsWithChildren, useMemo, useRef } from 'react';
import { connect, Dispatch, Link, useIntl } from 'umi';

interface BasicLayoutProps extends ProLayoutProps {
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}

const noMatch = <Result status={403} title="403" subTitle="Sorry, you are not authorized to access this page." />;

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map(item => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return check(item.authority, localItem, null) as MenuDataItem;
  });

function BasicLayout(props: PropsWithChildren<BasicLayoutProps>) {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const menuDataRef = useRef<MenuDataItem[]>([]);
  const { formatMessage } = useIntl();

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  return (
    <>
      <ProLayout
        logo={logo}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
              defaultMessage: '首页',
            }),
          },
          ...routers,
        ]}
        postMenuData={menuData => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }}
        {...props}
        {...settings}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
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

export default connect(({ global, settings }: { global: GlobalModelState; settings: ProSettings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
