import { RedoOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import CSSTransition from 'xy-css-transition';
import { aesEncrypt, clamp, getStartX } from '../utils';
import styles from './index.less';

interface VerifyStyle {
  /**
   * 滑块箭头背景色
   */
  moveBlockBackgroundColor: string;
  /**
   * 滑块箭头边框颜色
   */
  leftBarBorderColor: string;
  /**
   * 滑块箭头图标
   */
  iconClass: string;
  /**
   * 滑块箭头过度
   */
  transitionLeft: string;
  /**
   * 滑块箭头左边距离
   */
  moveBlockLeft: string;
  /**
   * 滑块条已滑动宽度
   */
  transitionWidth: string;
  /**
   * 占位符文本
   */
  text: string;
}

interface VerifyState {
  /**
   * 是否验证成功
   */
  passFlag: boolean;
  /**
   * 验证结果文本
   */
  tipWords: string;
}

interface VerifySlideProps {
  /**
   * 根节点的附加类名
   */
  className?: string;
  /**
   * 验证图像尺寸
   */
  imgSize?: Size;
  /**
   * 滑块条尺寸
   */
  barSize?: Size;
  /**
   * 操作提示
   * 默认： 向右滑动完成验证
   */
  explain?: string;
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

const BlockColor = '#c3c6ca';
const SuccesColor = '#5cb85c';
const FailColor = '#d9534f';

/**
 * 滑块验证码
 */
export default function VerifySlide(props: VerifySlideProps) {
  const {
    className,
    getCaptcha,
    checkCaptcha,
    onCaptchaCheckChange,
    explain = '向右滑动完成验证',
    imgSize = { width: '310px', height: '155px' },
    barSize = { width: '310px', height: '40px' },
  } = props;
  const sliderBarDom = useRef(null);
  const [captcha, setCaptcha] = useState<CaptchaInfo | null>(null);
  const [
    { text, iconClass, moveBlockBackgroundColor, leftBarBorderColor, transitionLeft, moveBlockLeft, transitionWidth },
    setVerifyStyle,
  ] = useState<VerifyStyle>({
    text: explain,
    moveBlockBackgroundColor: '',
    leftBarBorderColor: '#ddd',
    iconClass: 'icon-right',
    transitionLeft: '',
    moveBlockLeft: '',
    transitionWidth: '',
  });
  const [{ passFlag, tipWords }, setVerifyState] = useState<VerifyState>({
    passFlag: false,
    tipWords: '',
  });

  const isStartRef = useRef(false);
  const isEndRef = useRef(false);
  const startTimeRef = useRef(0);
  const endTimeRef = useRef(0);
  const startLeftRef = useRef(0);
  const moveBlockLeftRef = useRef(moveBlockLeft);

  // init
  useEffect(() => {
    getPictrue();
  }, []);

  // listen events
  useEffect(() => {
    window.addEventListener('touchmove', move);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchend', end);
    window.addEventListener('mouseup', end);
    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchend', end);
      window.removeEventListener('mouseup', end);
    };
  }, [captcha, onCaptchaCheckChange]);

  function refresh() {
    isEndRef.current = false;
    getPictrue();
    setVerifyState({ passFlag: false, tipWords: '' });
    setVerifyStyle({
      transitionLeft: 'left .3s',
      moveBlockLeft: '',
      transitionWidth: 'width .3s',
      leftBarBorderColor: '#ddd',
      moveBlockBackgroundColor: '#fff',
      iconClass: 'icon-right',
      text: explain,
    });
    // .3s过度完毕后清除过度transition
    setTimeout(() => {
      setVerifyStyle(style => ({ ...style, transitionLeft: '', transitionWidth: '' }));
    }, 300);
  }

  function getPictrue() {
    getCaptcha().then(res => {
      if (res.repCode === '0000') {
        setCaptcha(res.repData);
      } else {
        setVerifyState(verifyState => ({ ...verifyState, tipWords: res.repMsg }));
      }
    });
  }

  function start(e: any) {
    const sliderBar = sliderBarDom.current as HTMLElement | null;
    if (!sliderBar) {
      return;
    }

    startLeftRef.current = getStartX(e);
    startTimeRef.current = +new Date();
    if (isEndRef.current === false) {
      isStartRef.current = true;
      setVerifyStyle(style => ({
        ...style,
        text: '',
        moveBlockBackgroundColor: BlockColor,
        leftBarBorderColor: BlockColor,
      }));
      e.stopPropagation();
    }
  }

  function move(e: any) {
    const sliderBar = sliderBarDom.current as HTMLElement | null;
    if (!sliderBar) {
      return;
    }

    if (isStartRef.current && isEndRef.current === false) {
      let offsetX = getStartX(e) - startLeftRef.current;
      offsetX = clamp(offsetX, 0, parseFloat(barSize.width) - parseFloat(barSize.height));
      moveBlockLeftRef.current = offsetX + 'px';
      setVerifyStyle(style => ({ ...style, moveBlockLeft: moveBlockLeftRef.current }));
    }
  }

  function end() {
    endTimeRef.current = new Date().getTime();
    if (!isStartRef.current || isEndRef.current) {
      return;
    }

    const { secretKey, token } = captcha || {};

    // 判断是否重合
    var moveLeftDistance = parseInt(moveBlockLeftRef.current.replace('px', '') || '0');
    moveLeftDistance = (moveLeftDistance * 310) / parseInt(imgSize.width);
    const data: CheckCaptchaParams = {
      captchaType: 'blockPuzzle',
      token: token || '',
      pointJson: secretKey
        ? aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey)
        : JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
    };
    var captchaVerification = secretKey
      ? aesEncrypt(token + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }), secretKey)
      : token + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 });
    checkCaptcha(data).then(res => {
      const chcked = res.repCode === '0000';
      setVerifyStyle(style => ({
        ...style,
        moveBlockBackgroundColor: chcked ? SuccesColor : FailColor,
        leftBarBorderColor: chcked ? SuccesColor : FailColor,
        iconClass: chcked ? 'icon-check' : 'icon-close',
      }));
      setVerifyState({
        passFlag: chcked,
        tipWords: chcked ? `${((endTimeRef.current - startTimeRef.current) / 1000).toFixed(1)}s 验证成功` : '验证失败',
      });

      setTimeout(() => {
        if (onCaptchaCheckChange) {
          onCaptchaCheckChange(chcked, captchaVerification);
        }
        refresh();
      }, 1000);

      isEndRef.current = true;
    });
    isStartRef.current = false;
  }

  return (
    <div className={classNames(className, styles.verifySlide)}>
      <div style={{ height: imgSize.height }}>
        <div className={styles.verifyImgPanel} style={{ width: imgSize.width, height: imgSize.height }}>
          <img
            className={styles.fullBlock}
            src={captcha ? `data:image/png;base64,${captcha.originalImageBase64}` : ''}
          />
          <div className={styles.verifyRefresh} onClick={refresh}>
            <RedoOutlined />
          </div>
          <CSSTransition timeout={700} visible={!!tipWords}>
            <span className={classNames('verify-tips', passFlag ? styles.sucBg : styles.errBg)}>{tipWords}</span>
          </CSSTransition>
        </div>
      </div>
      <div
        ref={sliderBarDom}
        className={styles.verifyBarArea}
        style={{ width: imgSize.width, height: barSize.height, lineHeight: barSize.height }}
      >
        <span className={styles.verifyMsg}>{text}</span>
        <div
          className={styles.verifyLeftBar}
          style={{
            width: moveBlockLeft || barSize.height,
            height: barSize.height,
            borderColor: leftBarBorderColor,
            transition: transitionWidth,
          }}
        >
          <div
            onMouseDown={start}
            onTouchStart={start}
            className={styles.verifyMoveBlock}
            style={{
              width: barSize.height,
              height: barSize.height,
              backgroundColor: moveBlockBackgroundColor,
              left: moveBlockLeft,
              transition: transitionLeft,
            }}
          >
            <i className={classNames('verify-icon', iconClass)}></i>
            <div
              className={styles.verifySubBlock}
              style={{
                width: Math.floor((parseInt(imgSize.width) * 47) / 310) + 'px',
                height: imgSize.height,
                top: -parseInt(imgSize.height) + 'px',
                backgroundSize: imgSize.width + ' ' + imgSize.height,
              }}
            >
              <img
                className={styles.fullBlock}
                src={captcha ? `data:image/png;base64,${captcha.jigsawImageBase64}` : ''}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
