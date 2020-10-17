import Verify from '@/components/verifition/Verify';
import {
  AlipayCircleOutlined,
  LockTwoTone,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { Alert, Button, Checkbox, Form, Input, Tabs } from 'antd';
import { FormInstance } from 'antd/es/form';
import React, { useRef, useState } from 'react';
import { connect, Link } from 'umi';
import { StateType } from './model';
import { checkCaptcha, getCaptcha } from './service';
import styles from './style.less';

interface LoginProps {
  /** 模型调度 */
  dispatch: DispatchX<LoginParams>;
  /** 模型状态 */
  userlogin: StateType;
  /** 是否提交中 */
  submitting?: boolean;
  /** antd表单实例 */
  form?: FormInstance;
}

/**
 * 用户登陆页
 */
function Login(props: LoginProps) {
  const { form, dispatch, userlogin, submitting } = props;
  const [tabIndex, setTabIndex] = useState<string>('account');
  const [visible, setVisible] = useState(false);
  const valuesRef = useRef<LoginParams | null>(null);

  function handleSubmit(values: LoginParams) {
    if (tabIndex === 'account') {
      valuesRef.current = values;
      if (!visible) {
        setVisible(true);
      }
    } else {
      console.log('TODO: 即将写短信验证码登陆');
    }
  }

  function handleCaptchaCheckChange(checked: boolean, captchaVerification?: string) {
    if (checked && valuesRef.current && captchaVerification) {
      dispatch({
        type: 'userlogin/loginByCaptcha',
        payload: {
          ...valuesRef.current,
          captchaVO: {
            captchaVerification,
          },
        },
      });
    }
  }

  return (
    <div className={styles.main}>
      <Form className={styles.login} form={form} onFinish={handleSubmit}>
        <Tabs animated={true} className={styles.tabs} activeKey={tabIndex} onChange={setTabIndex}>
          <Tabs.TabPane key="account" tab="账号密码登陆">
            {userlogin.status === 'error' && tabIndex === 'account' && !submitting && (
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

      <Verify
        getCaptcha={getCaptcha}
        checkCaptcha={checkCaptcha}
        onCaptchaCheckChange={handleCaptchaCheckChange}
        visible={visible}
        onVisibleChange={setVisible}
      />
    </div>
  );
}

function LoginErrorMessage({ content }: { content: string }) {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />;
}

export default connect(({ userlogin, loading }: { userlogin: StateType; loading: EffectLoaing }) => ({
  userlogin,
  submitting: loading.effects['userlogin/loginByCaptcha'],
}))(Login);
