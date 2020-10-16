import { LoginParams } from '@/services/login';
import {
  AlipayCircleOutlined,
  LockTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input, Tabs } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useState } from 'react';
import { connect, Dispatch, Link } from 'umi';
import { StateType } from './model';
import styles from './style.less';

interface LoginProps {
  dispatch: Dispatch;
  userlogin: StateType;
  submitting?: boolean;
  form?: FormInstance;
}

/**
 * 用户登陆页
 */
function Login(props: LoginProps) {
  const { form, dispatch, userlogin, submitting } = props;
  const [type, setType] = useState<string>('account');

  function handleSubmit(values: LoginParams) {
    console.log('登陆!', values);
    if (type === 'account') {
      dispatch({
        type: 'userlogin/login',
        payload: values,
      });
    }
  }

  return (
    <div className={styles.main}>
      <Form className={styles.login} form={form} onFinish={handleSubmit}>
        <Tabs animated={true} className={styles.tabs} activeKey={type} onChange={setType}>
          <Tabs.TabPane key="account" tab="账号密码登陆">
            {userlogin.status === 'error' && type === 'account' && !submitting && (
              <LoginErrorMessage content={userlogin.errMsg || '登陆失败'} />
            )}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            >
              <Input
                size="large"
                name="username"
                placeholder="用户名: admin"
                prefix={
                  <UserOutlined
                    style={{
                      color: '#1890ff',
                    }}
                    className={styles.prefixIcon}
                  />
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
              ]}
            >
              <Input
                size="large"
                name="password"
                type="password"
                placeholder="密码: admin"
                prefix={<LockTwoTone className={styles.prefixIcon} />}
              />
            </Form.Item>
          </Tabs.TabPane>
          <Tabs.TabPane key="phone" tab="手机号登陆">
            <h1>todo: 暂无内容</h1>
          </Tabs.TabPane>
        </Tabs>
        <div>
          <Checkbox checked={true}>自动登录</Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Form.Item>
          <Button size="large" className={styles.submit} type="primary" htmlType="submit" loading={submitting}>
            登录
          </Button>
        </Form.Item>

        <div className={styles.other}>
          其他登录方式
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </Form>
    </div>
  );
}

function LoginErrorMessage({ content }: { content: string }) {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />;
}

export default connect(({ userlogin, loading }: { userlogin: StateType; loading: EffectLoaing }) => ({
  userlogin,
  submitting: loading.effects['userlogin/login'],
}))(Login);
