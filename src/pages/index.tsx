import React from 'react';
import styles from './index.less';
import { Button } from 'antd';
// import { getCaptcha } from '@/services/login';
import request from '@/utils/request';
import { setAuthority } from '@/utils/authority';

export default () => {
  function mocktest() {
    request
      .get('/test2')
      .then(res => {
        console.log('获取到了', res);
      })
      .catch(error => {
        console.error('error', error);
      });

    // getCaptcha()
    //   .then(res => {
    //     console.log('获取到了', res);
    //   })
    //   .catch(error => {
    //     console.error('失败', error);
    //   });
  }

  function login() {
    setAuthority({
      token: '12132',
      username: 'admin',
      expire: 1300,
      userId: 1,
    });
  }

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary" onClick={mocktest}>
        测试
      </Button>

      <Button onClick={login}>登陆</Button>
    </div>
  );
};
