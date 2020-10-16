import logo from '@/assets/logo.svg';
import { app_title } from '@/config/app-config';
import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import React, { PropsWithChildren } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { connect, ConnectProps, Link, SelectLang, useIntl } from 'umi';
import styles from './UserLayout.less';

/**
 * user界面布局
 */
function UserLayout(props: PropsWithChildren<Partial<ConnectProps>>) {
  const { children, route, location = { pathname: '' } } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(route?.routes || []);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: app_title,
    menu: {
      locale: true,
    },
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>XueYou Admin</span>
              </Link>
            </div>
            <div className={styles.desc}>XueYou Admin 是西湖区最具影响力的 Web 设计规范</div>
          </div>
          {children}
        </div>
      </div>
    </HelmetProvider>
  );
}

export default connect()(UserLayout);
