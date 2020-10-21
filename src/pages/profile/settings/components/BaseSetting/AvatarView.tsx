import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';
import styles from './index.less';

export default function AvatarView({ avatar }: { avatar: string }) {
  return (
    <>
      <div className={styles.avatar_title}>
        <FormattedMessage id="settings.basic.avatar" defaultMessage="头像" />
      </div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            <FormattedMessage id="settings.basic.change-avatar" defaultMessage="更换头像" />
          </Button>
        </div>
      </Upload>
    </>
  );
}
