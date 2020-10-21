import { AlipayOutlined, DingdingOutlined, TaobaoOutlined } from '@ant-design/icons';
import { List } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

export default function BindingSetting() {
  return (
    <List itemLayout="horizontal">
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.binding.bind" defaultMessage="绑定" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.binding.taobao" defaultMessage="绑定淘宝" />}
          description={
            <FormattedMessage id="settings.binding.taobao-description" defaultMessage="当前未绑定淘宝账号" />
          }
          avatar={<TaobaoOutlined className="taobao" />}
        />
      </List.Item>
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.binding.bind" defaultMessage="绑定" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.binding.alipay" defaultMessage="绑定支付宝" />}
          description={
            <FormattedMessage id="settings.binding.alipay-description" defaultMessage="当前未绑定支付宝账号" />
          }
          avatar={<AlipayOutlined className="alipay" />}
        />
      </List.Item>
      <List.Item
        actions={[
          <a key="Modify">
            <FormattedMessage id="settings.binding.bind" defaultMessage="绑定" />
          </a>,
        ]}
      >
        <List.Item.Meta
          title={<FormattedMessage id="settings.binding.dingding" defaultMessage="绑定钉钉" />}
          description={
            <FormattedMessage id="settings.binding.alipay-description" defaultMessage="当前未绑定钉钉账号" />
          }
          avatar={<DingdingOutlined className="dingding" />}
        />
      </List.Item>
    </List>
  );
}
