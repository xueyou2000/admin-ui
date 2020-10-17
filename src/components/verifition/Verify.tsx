import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import useMergeValue from 'use-merge-value';
import styles from './index.less';
import VerifySlide from './VerifySlide';

interface VerifyProps {
  /**
   * 根节点的附加类名
   */
  className?: string;
  /**
   * 是否显示验证框
   */
  visible?: boolean;
  /**
   * 可视改变
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * 验证图像尺寸
   */
  imgSize?: Size;
  /**
   * 获取验证码信息
   */
  getCaptcha: () => Promise<VerifyResponse<CaptchaInfo>>;
  /**
   * 校验验证码
   */
  checkCaptcha: (params: CheckCaptchaParams) => Promise<VerifyResponse<{ result: boolean }>>;
  /**
   * 验证状态改变
   */
  onCaptchaCheckChange?: (checked: boolean, captchaVerification?: string) => void;
}

/**
 * 验证码组件
 * 暂只支持滑块验证
 */
export default function Verify(props: VerifyProps) {
  const { getCaptcha, checkCaptcha, onCaptchaCheckChange, imgSize = { width: '310px', height: '155px' } } = props;
  const [visible, setVisible] = useMergeValue(false, { value: props.visible, onChange: props.onVisibleChange });

  function hide(refresh?: boolean) {
    setVisible(false);
    if (refresh) {
      // todo: 重新获取验证码信息
    }
  }

  function handleCaptchaCheckChange(checked: boolean, captchaVerification?: string) {
    if (checked) {
      if (props.onVisibleChange) {
        props.onVisibleChange(false);
      }
      // setVisible(false);  这种有bug,不会正确设置, 可能由于触发事件是原声dom监听函数
    }
    if (onCaptchaCheckChange) {
      onCaptchaCheckChange(checked, captchaVerification);
    }
  }

  return (
    <div
      style={{ display: visible ? 'block' : 'none' }}
      className={classNames(styles.verifySlide, styles.mask, props.className)}
    >
      <div className={styles.verifybox} style={{ maxWidth: parseInt(imgSize.width) + 30 + 'px' }}>
        <div className={styles.verifyboxTop}>
          请完成安全验证
          <span className={styles.verifyboxClose} onClick={() => hide(true)}>
            <CloseOutlined />
          </span>
        </div>
        <div className={styles.verifyboxBottom}>
          <VerifySlide
            getCaptcha={getCaptcha}
            checkCaptcha={checkCaptcha}
            imgSize={imgSize}
            onCaptchaCheckChange={handleCaptchaCheckChange}
          />
        </div>
      </div>
    </div>
  );
}
