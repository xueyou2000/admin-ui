import { GridContent } from '@ant-design/pro-layout';
import { Menu } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { connect, Dispatch, FormattedMessage, UserModelState } from 'umi';
import BaseSetting from './components/BaseSetting';
import BindSetting from './components/BindSetting';
import SecuritySetting from './components/SecuritySetting';
import styles from './style.less';

interface SettingsProps {
  dispatch: Dispatch;
  currentUser: SystemUser;
}

type AccountSettingsStateKeys = 'base' | 'security' | 'binding';

function Settings({ dispatch }: SettingsProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [selectKey, setSelectKey] = useState<AccountSettingsStateKeys>('base');
  const [mode, setMode] = useState<'inline' | 'horizontal'>('inline');
  const [menuMap] = useState<{ [key: string]: React.ReactNode }>({
    base: <FormattedMessage id="settings.menuMap.basic" defaultMessage="基础设置" />,
    security: <FormattedMessage id="settings.menuMap.security" defaultMessage="安全设置" />,
    binding: <FormattedMessage id="settings.menuMap.binding" defaultMessage="账号绑定" />,
  });

  useEffect(() => {
    dispatch({
      type: 'user/fetchCurrent',
    });

    function resizeHandle() {
      requestAnimationFrame(() => {
        const main = mainRef.current as HTMLDivElement;
        if (main) {
          const { offsetWidth } = main;
          let newMode: 'inline' | 'horizontal' = 'inline';
          if (offsetWidth < 641 && offsetWidth > 400) {
            newMode = 'horizontal';
          }
          if (window.innerWidth < 768 && offsetWidth > 400) {
            newMode = 'horizontal';
          }
          setMode(newMode);
        }
      });
    }

    window.addEventListener('resize', resizeHandle);
    return () => {
      window.removeEventListener('resize', resizeHandle);
    };
  }, []);

  function renderChidren() {
    switch (selectKey) {
      case 'base':
        return <BaseSetting />;
      case 'security':
        return <SecuritySetting />;
      case 'binding':
        return <BindSetting />;
      default:
        break;
    }
    return null;
  }

  return (
    <GridContent>
      <div className={styles.main} ref={mainRef}>
        <div className={styles.leftMenu}>
          <Menu
            mode={mode}
            selectedKeys={[selectKey]}
            onClick={({ key }) => setSelectKey(key as AccountSettingsStateKeys)}
          >
            {Object.keys(menuMap).map(item => (
              <Menu.Item key={item}>{menuMap[item]}</Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[selectKey]}</div>
          {renderChidren()}
        </div>
      </div>
    </GridContent>
  );
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(Settings);
