import styles from './index.less';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, ConnectProps, connect, UserModelState, FormattedMessage } from 'umi';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import HeaderDropdown from '../HeaderDropdown';

interface AvatarDropdownProps extends Partial<ConnectProps> {
  currentUser?: SystemUser;
  menu?: boolean;
}

function AvatarDropdown(props: AvatarDropdownProps) {
  const { currentUser, menu, dispatch } = props;

  function onMenuClick(event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) {
    const { key } = event;
    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'userlogin/logout',
        });
      }
      return;
    }
    history.push(`/profile/${key}`);
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          <FormattedMessage id="menu.user.settings" defaultMessage="个人设置" />
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        <FormattedMessage id="menu.user.logout" defaultMessage="退出登录" />
      </Menu.Item>
    </Menu>
  );

  return currentUser ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
