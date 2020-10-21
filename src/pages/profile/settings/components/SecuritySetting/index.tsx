import { List } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

export default function SecuritySetting() {
  const passwordStrength = {
    strong: (
      <span className="strong">
        <FormattedMessage id="settings.security.strong" defaultMessage="强" />
      </span>
    ),
    medium: (
      <span className="medium">
        <FormattedMessage id="settings.security.medium" defaultMessage="中等" />
      </span>
    ),
    weak: (
      <span className="weak">
        <FormattedMessage id="settings.security.weak" defaultMessage="弱" />
        Weak
      </span>
    ),
  };

  return (
    <List itemLayout="horizontal">
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.security.modify" defaultMessage="修改" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.security.password" defaultMessage="账户密码" />}
          description={
            <span>
              <FormattedMessage id="settings.security.password-description" defaultMessage="当前密码强度：" />{' '}
              {passwordStrength.strong}
            </span>
          }
        />
      </List.Item>
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.security.modify" defaultMessage="修改" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.security.phone" defaultMessage="密保手机" />}
          description={
            <span>
              <FormattedMessage id="settings.security.phone-description" defaultMessage="已绑定手机：" /> 138****8293
            </span>
          }
        />
      </List.Item>
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.security.modify" defaultMessage="修改" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.security.email" defaultMessage="备用邮箱" />}
          description={
            <span>
              <FormattedMessage id="settings.security.email-description" defaultMessage="已绑定邮箱：" /> ant***sign.com
            </span>
          }
        />
      </List.Item>
    </List>
  );
}
