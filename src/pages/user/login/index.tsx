import { AlipayCircleOutlined, TaobaoCircleOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Tabs } from 'antd';
import React, { useState } from 'react';
import { connect, FormattedMessage, Link } from 'umi';
import MobileLoginPanel from './components/MobileLoginPanel';
import VerifyLoginPanel from './components/VerifyLoginPanel';
import styles from './style.less';

interface LoginProps {
  /** 模型调度 */
  dispatch: DispatchX<MobileLoginParams>;
  /** 是否提交中 */
  submitting: boolean;
}

function t(key: string) {
  return 'userlogin.' + key;
}

/**
 * 用户登陆页
 */
function Login(props: LoginProps) {
  const { dispatch, submitting } = props;
  const [form] = Form.useForm();
  const [tabIndex, setTabIndex] = useState<string>('verifySlideLogin');
  const [visible, setVisible] = useState(false);

  function handleSubmit(data: MobileLoginParams) {
    if (tabIndex === 'verifySlideLogin') {
      setVisible(true);
    } else {
      dispatch({
        type: 'userlogin/loginByMobile',
        payload: data,
      });
    }
  }

  return (
    <div className={styles.main}>
      <Form className={styles.login} form={form} onFinish={handleSubmit}>
        <Tabs activeKey={tabIndex} onChange={setTabIndex} centered={true} animated={true} tabPosition={'top'}>
          <Tabs.TabPane
            key="verifySlideLogin"
            tab={<FormattedMessage id={t('verifySlideLogin.tabName')} defaultMessage="账号密码登陆" />}
          >
            {/*  防止在一个tab内容内操作提交， 另一个tab内执行了表单验证 */}
            {tabIndex === 'verifySlideLogin' && (
              <VerifyLoginPanel form={form} visible={visible} onVisibleChange={setVisible} />
            )}
          </Tabs.TabPane>
          <Tabs.TabPane
            key="mobileLogin"
            tab={<FormattedMessage id={t('mobileLogin.tabName')} defaultMessage="手机号登陆" />}
          >
            {/*  防止在一个tab内容内操作提交， 另一个tab内执行了表单验证 */}
            {tabIndex === 'mobileLogin' && <MobileLoginPanel />}
          </Tabs.TabPane>
        </Tabs>
        <div>
          <Checkbox checked={true}>
            <FormattedMessage id={t('autologin')} defaultMessage="自动登陆" />
          </Checkbox>
          <a style={{ float: 'right' }}>
            <FormattedMessage id={t('forget')} defaultMessage="忘记密码" />
          </a>
        </div>
        <Form.Item>
          <Button size="large" className={styles.submit} type="primary" htmlType="submit" loading={submitting}>
            <FormattedMessage id={t('loginBtn')} defaultMessage="登录" />
          </Button>
        </Form.Item>
        <div className={styles.other}>
          <FormattedMessage id={t('loginWay.other')} defaultMessage="其他登录方式" />
          <AlipayCircleOutlined className={styles.icon} />
          <TaobaoCircleOutlined className={styles.icon} />
          <WeiboCircleOutlined className={styles.icon} />
          <Link className={styles.register} to="/user/register">
            <FormattedMessage id={t('register')} defaultMessage="注册账户" />
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default connect(({ loading }: { loading: EffectLoaing }) => ({
  submitting: loading.effects['userlogin/loginByCaptcha'] || loading.effects['userlogin/loginByMobile'],
}))(Login);
