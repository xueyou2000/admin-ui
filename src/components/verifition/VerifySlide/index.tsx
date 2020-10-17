import { RedoOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import CSSTransition from 'xy-css-transition';
import { aesEncrypt } from '../utils';
import styles from './index.less';

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
   * 点击元素尺寸
   */
  blockSize?: Size;
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

export default function VerifySlide(props: VerifySlideProps) {
  const {
    className,
    getCaptcha,
    checkCaptcha,
    onCaptchaCheckChange,
    explain = '向右滑动完成验证',
    imgSize = { width: '310px', height: '155px' },
    barSize = { width: '310px', height: '40px' },
    blockSize = { width: '50px', height: '30px' },
  } = props;
  const [captcha, setCaptcha] = useState<CaptchaInfo | null>(null);
  const captchaRef = useRef(captcha);
  const [tipWords, setTipWords] = useState('');
  const [text, setText] = useState(explain);
  const [leftBarWidth, setLeftBarWidth] = useState<string | null>(null);
  const [leftBarBorderColor, setLeftBarBorderColor] = useState('#ddd');
  const [transitionWidth, setTransitionWidth] = useState('');
  const [moveBlockBackgroundColor, setMoveBlockBackgroundColor] = useState('');
  const [moveBlockLeft, setMoveBlockLeft] = useState('');
  const moveBlockLeftRef = useRef(moveBlockLeft);
  const [transitionLeft, setTransitionLeft] = useState('');
  const [iconClass, setIconClass] = useState('icon-right');
  const [iconColor, setIconColor] = useState('');
  const [passFlag, setPassFlag] = useState(false);
  const barAreaRef = useRef(null);
  // 开始滑动的时间
  const startMoveTimeRef = useRef(0);
  const endMovetimeRef = useRef(0);
  const isEndRef = useRef(false);
  const statusRef = useRef(false);
  const startLeftRef = useRef(0);

  function refresh() {
    setTransitionLeft('left .3s');
    setMoveBlockLeft('0px');
    setLeftBarWidth('');
    setTransitionWidth('width .3s');

    setLeftBarBorderColor('#ddd');
    setMoveBlockBackgroundColor('#fff');
    setIconColor('#000');
    setIconClass('icon-right');
    isEndRef.current = false;

    getPictrue();
    setTimeout(() => {
      setTransitionWidth('');
      setTransitionLeft('');
      setText(explain);
    }, 400);
  }

  function getPictrue() {
    getCaptcha().then(res => {
      if (res.repCode === '0000') {
        captchaRef.current = res.repData;
        setCaptcha(res.repData);
      } else {
        setTipWords(res.repMsg);
      }
    });
  }

  function start(e: any) {
    const barArea = barAreaRef.current as HTMLElement | null;
    if (!barArea) {
      return;
    }

    let x: number;
    if (!e.touches) {
      // 兼容PC端
      x = e.clientX;
    } else {
      // 兼容移动端
      x = e.touches[0].pageX;
    }

    startLeftRef.current = Math.floor(x - barArea.getBoundingClientRect().left);
    startMoveTimeRef.current = +new Date();
    if (isEndRef.current === false) {
      setText('');
      setMoveBlockBackgroundColor('#337ab7');
      setLeftBarBorderColor('#337AB7');
      setIconColor('#fff');
      e.stopPropagation();
      statusRef.current = true;
    }
  }

  function move(e: any) {
    const barArea = barAreaRef.current as HTMLElement | null;
    if (!barArea) {
      return;
    }

    if (statusRef.current && isEndRef.current === false) {
      let x;
      if (!e.touches) {
        // 兼容PC端
        x = e.clientX;
      } else {
        // 兼容移动端
        x = e.touches[0].pageX;
      }
      const barAreaLeft = barArea.getBoundingClientRect().left;
      let moveBlockLeft = x - barAreaLeft; // 小方块相对于父元素的left值
      if (moveBlockLeft >= barArea.offsetWidth - parseInt(parseInt(blockSize.width) / 2 + '') - 2) {
        moveBlockLeft = barArea.offsetWidth - parseInt(parseInt(blockSize.width) / 2 + '') - 2;
      }
      if (moveBlockLeft <= 0) {
        moveBlockLeft = parseInt(parseInt(blockSize.width) / 2 + '');
      }

      moveBlockLeftRef.current = moveBlockLeft - startLeftRef.current + 'px';
      setMoveBlockLeft(moveBlockLeftRef.current);
      setLeftBarWidth(moveBlockLeftRef.current);
    }
  }

  function end(e: any) {
    endMovetimeRef.current = new Date().getTime();
    // 判断是否重合
    if (statusRef.current && isEndRef.current === false) {
      var moveLeftDistance = parseInt((moveBlockLeftRef.current || '').replace('px', ''));
      moveLeftDistance = (moveLeftDistance * 310) / parseInt(imgSize.width);
      const data: CheckCaptchaParams = {
        captchaType: 'blockPuzzle',
        pointJson: aesEncrypt(JSON.stringify({ x: moveLeftDistance, y: 5.0 }), captchaRef.current?.secretKey || ''),
        token: captchaRef.current?.token || '',
      };

      checkCaptcha(data).then(res => {
        if (res.repCode === '0000') {
          setMoveBlockBackgroundColor('#5cb85c');
          setLeftBarBorderColor('#5cb85c');
          setIconColor('#fff');
          setIconClass('icon-check');
          isEndRef.current = true;
          setPassFlag(true);
          setTipWords(`${((endMovetimeRef.current - startMoveTimeRef.current) / 1000).toFixed(2)}s验证成功`);
          var captchaVerification = aesEncrypt(
            captcha?.secretKey || '' + '---' + JSON.stringify({ x: moveLeftDistance, y: 5.0 }),
            captcha?.secretKey || '',
          );
          setTimeout(() => {
            console.log('验证通过', captchaVerification);
            if (onCaptchaCheckChange) {
              onCaptchaCheckChange(true, captchaVerification);
            }
            refresh();
          }, 1000);
        } else {
          setMoveBlockBackgroundColor('#d9534f');
          setLeftBarBorderColor('#d9534f');
          setIconColor('#fff');
          setIconClass('icon-close');
          setPassFlag(false);

          setTimeout(() => {
            refresh();
          }, 1000);

          if (onCaptchaCheckChange) {
            onCaptchaCheckChange(false);
          }
          setTipWords('验证失败');
          setTimeout(() => {
            setTipWords('');
          }, 1000);
        }
      });
      statusRef.current = false;
    }
  }

  useEffect(() => {
    getPictrue();

    window.addEventListener('touchmove', move);
    window.addEventListener('mousemove', move);

    // 鼠标松开
    window.addEventListener('touchend', end);
    window.addEventListener('mouseup', end);

    return () => {
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchend', end);
      window.removeEventListener('mouseup', end);
    };
  }, []);

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
        ref={barAreaRef}
        className={styles.verifyBarArea}
        style={{ width: imgSize.width, height: barSize.height, lineHeight: barSize.height }}
      >
        <span className={styles.verifyMsg}>{text}</span>
        <div
          className={styles.verifyLeftBar}
          style={{
            width: leftBarWidth || barSize.height,
            height: barSize.height,
            borderColor: leftBarBorderColor,
            transition: transitionWidth,
          }}
        >
          <div
            className={styles.verifyMoveBlock}
            onTouchStart={start}
            onMouseDown={start}
            style={{
              width: barSize.height,
              height: barSize.height,
              backgroundColor: moveBlockBackgroundColor,
              left: moveBlockLeft,
              transition: transitionLeft,
            }}
          >
            <i className={classNames('verify-icon', iconClass)} style={{ color: iconColor }}></i>
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
