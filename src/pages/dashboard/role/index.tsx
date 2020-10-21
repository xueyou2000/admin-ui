import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { useActivate, useUnactivate } from 'react-activation';
import { useLocation } from 'umi';

export default function Welcome() {
  const localtion = useLocation();

  useActivate(() => {
    console.log('进入role页面', localtion);
  });

  useUnactivate(() => {
    console.log('离开role页面');
  });

  return (
    <PageHeaderWrapper content="欢迎使用">
      <div>Role Page 3</div>
      <input type="text" />
    </PageHeaderWrapper>
  );
}
