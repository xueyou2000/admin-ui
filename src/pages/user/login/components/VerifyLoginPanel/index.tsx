import Verify from '@/components/verifition/Verify';
import { LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/es/form';
import React from 'react';
import { connect, FormattedMessage, useIntl } from 'umi';
import useMergeValue from 'use-merge-value';
import { StateType } from '../../model';
import { checkCaptcha, getCaptcha } from '../../service';
import LoginErrorMessage from '../LoginErrorMessage';
import styles from './index.less';

interface VerifyLoginPanelProps {
  /** 模型调度 */
  dispatch?: DispatchX<LoginParams>;
  /** 模型状态 */
  userlogin?: StateType;
  /** 是否提交中 */
  submitting?: boolean;
  /** antd表单实例 */
  form?: FormInstance;
  /** 是否显示验证框 */
  visible?: boolean;
  /** 可视改变 */
  onVisibleChange?: (visible: boolean) => void;
}

function t(key: string) {
  return 'userlogin.verifySlideLogin.' + key;
}

/**
 * 滑块验证码登陆
 */
function VerifyLoginPanel(props: VerifyLoginPanelProps) {
  const { userlogin, submitting, form, dispatch } = props;
  const intl = useIntl();
  const [visible, setVisible] = useMergeValue(false, { value: props.visible, onChange: props.onVisibleChange });

  function handleCaptchaCheckChange(checked: boolean, captchaVerification?: string) {
    if (!form || !dispatch) {
      return;
    }
    const values: LoginParams = form.getFieldsValue();
    if (checked && values && captchaVerification) {
      dispatch({
        type: 'userlogin/loginByCaptcha',
        payload: {
          ...values,
          captchaVO: {
            captchaVerification,
          },
        },
      });
    }
  }

  return (
    <>
      {userlogin && userlogin.status === 'error' && !submitting && <LoginErrorMessage content={userlogin.errMsg} />}
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: <FormattedMessage id={t('username.required.message')} defaultMessage="请输入用户名!" />,
          },
        ]}
      >
        <Input
          size="large"
          name="username"
          placeholder={intl.formatMessage({ id: t('username.placeholder'), defaultMessage: '用户名: admin' })}
          prefix={<UserOutlined style={{ color: '#1890ff' }} className={styles.prefixIcon} />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: <FormattedMessage id={t('password.required.message')} defaultMessage="请输入密码!" />,
          },
        ]}
      >
        <Input
          size="large"
          name="password"
          type="password"
          placeholder={intl.formatMessage({ id: t('password.placeholder'), defaultMessage: '密码: admin' })}
          prefix={<LockTwoTone className={styles.prefixIcon} />}
        />
      </Form.Item>

      <Verify
        getCaptcha={getCaptcha}
        checkCaptcha={checkCaptcha}
        onCaptchaCheckChange={handleCaptchaCheckChange}
        visible={visible}
        onVisibleChange={setVisible}
      />
    </>
  );
}

export default connect(({ userlogin, loading }: { userlogin: StateType; loading: EffectLoaing }) => ({
  userlogin,
  submitting: loading.effects['userlogin/loginByCaptcha'],
}))(VerifyLoginPanel) as React.FC<VerifyLoginPanelProps>;
