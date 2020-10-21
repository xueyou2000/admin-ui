import { Button, Form, Input } from 'antd';
import React from 'react';
import { connect, ConnectProps, FormattedMessage, useIntl, UserModelState } from 'umi';
import AvatarView from './AvatarView';
import styles from './index.less';

interface BaseSettingProps extends ConnectProps {
  currentUser: SystemUser;
  submitting: boolean;
}

function BaseSetting({ currentUser, submitting, dispatch }: Partial<BaseSettingProps>) {
  const intl = useIntl();

  function handleFinish(data: SystemUser) {
    if (dispatch) {
      dispatch({
        type: 'user/updateCurrentUser',
        payload: data,
      });
    }
  }

  return (
    <div className={styles.baseView}>
      <div className={styles.left}>
        <Form layout="vertical" initialValues={currentUser} requiredMark={false} onFinish={handleFinish}>
          <Form.Item
            name="email"
            label={<FormattedMessage id="settings.basic.email" defaultMessage="邮箱" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'settings.basic.email-message', defaultMessage: '请输入您的邮箱!' }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="userName"
            label={<FormattedMessage id="settings.basic.nickname" defaultMessage="昵称" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'settings.basic.nickname-message',
                  defaultMessage: '请输入您的昵称!',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="remark"
            label={<FormattedMessage id="settings.basic.profile" defaultMessage="个人简介" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'settings.basic.profile-message',
                  defaultMessage: '请输入个人简介!',
                }),
              },
            ]}
          >
            <Input.TextArea
              placeholder={intl.formatMessage({ id: 'settings.basic.profile-placeholder', defaultMessage: '个人简介' })}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            name="phonenumber"
            label={<FormattedMessage id="settings.basic.phone" defaultMessage="联系电话" />}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'settings.basic.phone-message',
                  defaultMessage: '请输入您的联系电话!',
                }),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={submitting}>
              <FormattedMessage id="settings.basic.update" defaultMessage="更新基本信息" />
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.right}>
        <AvatarView
          avatar={currentUser?.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'}
        />
      </div>
    </div>
  );
}

export default connect(({ user, loading }: { user: UserModelState; loading: EffectLoaing }) => ({
  currentUser: user.currentUser,
  submitting: loading.effects['user/updateCurrentUser'],
}))(BaseSetting);
