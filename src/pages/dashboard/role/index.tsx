import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default function Welcome() {
  return (
    <PageHeaderWrapper content="欢迎使用">
      <div>User Page</div>
      <input type="text" />
    </PageHeaderWrapper>
  );
}
