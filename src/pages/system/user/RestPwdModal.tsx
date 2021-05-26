import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { restPassword } from './service';

export default function RestPwdModal({ user }: { user: SystemUser }) {
  const intl = useIntl();
  const { loading, submitHandle } = useSubmit<SystemUser>(data =>
    restPassword(user.userId, data.password).then(() => {
      message.success(intl.formatMessage({ id: 'UserPage.restPwdSuccess', defaultMessage: '重置密码成功' }));
    }),
  );

  return (
    <Form<SystemUser>
      onFinish={submitHandle}
      initialValues={{ loginName: user.loginName }}
      labelCol={{ xs: { span: 24 }, sm: { span: 9 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="loginName" label={<FormattedMessage id="User.loginName" defaultMessage="用户名" />}>
          <Input
            placeholder={intl.formatMessage({ id: 'User.loginName.required', defaultMessage: '请输入用户名' })}
            disabled={true}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label={<FormattedMessage id="User.newpassword" defaultMessage="新密码" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'User.newpassword.required', defaultMessage: '请输入新密码' }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({ id: 'User.newpassword', defaultMessage: '新密码' })}
            type="password"
          />
        </Form.Item>
      </ModalContent>
      <ModalFooter>
        <Button>
          <FormattedMessage id="common.cancel" defaultMessage="取消" />
        </Button>
        <Button type="primary" loading={loading} htmlType="submit">
          <FormattedMessage id="common.confirm" defaultMessage="确定" />
        </Button>
      </ModalFooter>
    </Form>
  );
}
