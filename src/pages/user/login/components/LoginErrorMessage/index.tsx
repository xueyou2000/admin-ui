import { Alert } from 'antd';
import React from 'react';

/**
 * 登陆失败提示
 */
export default function LoginErrorMessage({ content }: { content?: string }) {
  return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon={true} />;
}
