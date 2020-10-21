import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';
import { Settings } from '@ant-design/pro-layout';
import React from 'react';
import { connect, ConnectProps, SelectLang } from 'umi';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
import AvatarDropdown from './AvatarDropdown';

interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  layout?: 'side' | 'top' | 'mix';
  theme?: Settings['navTheme'] | 'realDark';
}

const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

/**
 * 页眉
 */
function GlobalHeaderRight(props: GlobalHeaderRightProps) {
  const { theme, layout } = props;
  let className = styles.right;
  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      <AvatarDropdown menu={true} />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      <SelectLang className={styles.action} />
    </div>
  );
}

export default connect(({ settings }: { settings: Settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
