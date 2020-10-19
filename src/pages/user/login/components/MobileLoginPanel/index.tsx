import { MailTwoTone, MobileTwoTone } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { connect, FormattedMessage, useIntl } from 'umi';
import { StateType } from '../../model';
import { getMobileCaptcha } from '../../service';
import LoginErrorMessage from '../LoginErrorMessage';
import styles from './index.less';

interface MobileLoginPanelProps {
  /** 模型状态 */
  userlogin?: StateType;
  /** 是否提交中 */
  submitting?: boolean;
}

function t(key: string) {
  return 'userlogin.mobileLogin.' + key;
}

/**
 * 手机号登陆
 */
function MobileLoginPanel(props: MobileLoginPanelProps) {
  const { userlogin, submitting } = props;
  const intl = useIntl();
  const [count, setCount] = useState<number>(120);
  const [timing, setTiming] = useState(false);

  const onGetCaptcha = useCallback((mobile: string) => {
    getMobileCaptcha(mobile)
      .then(() => {
        setTiming(true);
      })
      .catch(error => {
        console.error('验证码发送失败: ', error.message);
      });
  }, []);

  useEffect(() => {
    let interval: number = 0;
    if (timing) {
      interval = window.setInterval(() => {
        setCount(preSecond => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            // 重置秒数
            return 120;
          }
          return preSecond - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <>
      {userlogin && userlogin.status === 'error' && !submitting && <LoginErrorMessage content={userlogin.errMsg} />}
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: <FormattedMessage id={t('mobile.required.message')} defaultMessage="请输入手机号！" />,
          },
          {
            pattern: /^1\d{10}$/,
            message: <FormattedMessage id={t('mobile.pattern.message')} defaultMessage="手机号格式错误！" />,
          },
        ]}
      >
        <Input
          size="large"
          name="mobile"
          prefix={<MobileTwoTone className={styles.prefixIcon} />}
          placeholder={intl.formatMessage({ id: t('mobile.placeholder'), defaultMessage: '手机号' })}
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {({ getFieldValue }) => (
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id={t('captcha.required.message')} defaultMessage="请输入验证码！" />,
                  },
                ]}
              >
                <Input
                  size="large"
                  name="captcha"
                  prefix={<MailTwoTone className={styles.prefixIcon} />}
                  placeholder={intl.formatMessage({ id: t('captcha.placeholder'), defaultMessage: '验证码' })}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button
                disabled={timing}
                className={styles.getCaptcha}
                size="large"
                onClick={() => {
                  const value = getFieldValue('mobile');
                  onGetCaptcha(value);
                }}
              >
                {timing ? (
                  `${count} ${intl.formatMessage({ id: t('second'), defaultMessage: '秒' })}`
                ) : (
                  <FormattedMessage id={t('captcha.get')} defaultMessage="获取验证码" />
                )}
              </Button>
            </Col>
          </Row>
        )}
      </Form.Item>
    </>
  );
}

export default connect(({ userlogin, loading }: { userlogin: StateType; loading: EffectLoaing }) => ({
  userlogin,
  submitting: loading.effects['userlogin/loginByMobile'],
}))(MobileLoginPanel) as React.FC<MobileLoginPanelProps>;
