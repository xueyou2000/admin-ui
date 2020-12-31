import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { restPassword } from './service';

export default function RestPwdModal({ user }: { user: SystemUser }) {
  const { loading, submitHandle } = useSubmit<SystemUser>(data =>
    restPassword(user.userId, data.password).then(() => {
      message.success('重置密码成功');
    }),
  );

  return (
    <Form<SystemUser>
      onFinish={submitHandle}
      initialValues={{ loginName: user.loginName }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="loginName" label="用户名">
          <Input placeholder="登陆账号" disabled={true} />
        </Form.Item>
        <Form.Item name="password" label="新密码" rules={[{ required: true, message: '请输入新密码' }]}>
          <Input placeholder="新密码" type="password" />
        </Form.Item>
      </ModalContent>
      <ModalFooter>
        <Button>取消</Button>
        <Button type="primary" loading={loading} htmlType="submit">
          确定
        </Button>
      </ModalFooter>
    </Form>
  );
}
