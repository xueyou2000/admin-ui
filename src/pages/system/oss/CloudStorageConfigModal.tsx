import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Select, Radio } from 'antd';
import React, { useState } from 'react';
import { updateCloudStorageConfig } from './service';
import merge from 'lodash/merge';

export default function CloudStorageConfigModal({ config }: { config: CloudStorageConfig }) {
  const { loading, submitHandle } = useSubmit<CloudStorageConfig>(data =>
    updateCloudStorageConfig(merge({}, config, data)).then(() => {
      message.success('修改成功');
    }),
  );
  const [type, setType] = useState<number>(config.type || 1);

  return (
    <Form<CloudStorageConfig>
      onFinish={submitHandle}
      initialValues={config}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="type" label="服务商" rules={[{ required: true, message: '选择服务商' }]}>
          <Radio.Group onChange={e => setType(e.target.value)}>
            <Radio value={1}>七牛云</Radio>
            <Radio value={2}>阿里云</Radio>
            <Radio value={3}>腾讯云</Radio>
          </Radio.Group>
        </Form.Item>

        {type == 1 && (
          <>
            <Form.Item name="qiniuDomain" label="域名" rules={[{ required: type == 1, message: '请输入域名' }]}>
              <Input placeholder="请输入域名" />
            </Form.Item>
            <Form.Item name="qiniuPrefix" label="路径前缀" rules={[{ required: type == 1, message: '请输入路径前缀' }]}>
              <Input placeholder="请输入路径前缀" />
            </Form.Item>
            <Form.Item
              name="qiniuAccessKey"
              label="AccessKey"
              rules={[{ required: type == 1, message: '请输入AccessKey' }]}
            >
              <Input placeholder="AccessKey" />
            </Form.Item>
            <Form.Item
              name="qiniuSecretKey"
              label="SecretKey"
              rules={[{ required: type == 1, message: '请输入SecretKey' }]}
            >
              <Input placeholder="SecretKey" />
            </Form.Item>
            <Form.Item name="qiniuBucketName" label="空间名" rules={[{ required: type == 1, message: '请输入空间名' }]}>
              <Input placeholder="空间名" />
            </Form.Item>
          </>
        )}

        {type == 2 && (
          <>
            <Form.Item name="aliyunDomain" label="域名" rules={[{ required: type == 2, message: '请输入域名' }]}>
              <Input placeholder="请输入域名" />
            </Form.Item>
            <Form.Item
              name="aliyunPrefix"
              label="路径前缀"
              rules={[{ required: type == 2, message: '请输入路径前缀' }]}
            >
              <Input placeholder="请输入路径前缀" />
            </Form.Item>
            <Form.Item
              name="aliyunEndPoint"
              label="EndPoint"
              rules={[{ required: type == 2, message: '请输入EndPoint' }]}
            >
              <Input placeholder="EndPoint" />
            </Form.Item>
            <Form.Item
              name="aliyunAccessKeyId"
              label="SecretKey"
              rules={[{ required: type == 2, message: '请输入AccessKeyId' }]}
            >
              <Input placeholder="SecretKey" />
            </Form.Item>
            <Form.Item
              name="aliyunAccessKeySecret"
              label="AccessKeySecret"
              rules={[{ required: type == 2, message: '请输入AccessKeySecret' }]}
            >
              <Input placeholder="AccessKeySecret" />
            </Form.Item>
            <Form.Item
              name="aliyunBucketName"
              label="BucketName"
              rules={[{ required: type == 2, message: '请输入BucketName' }]}
            >
              <Input placeholder="BucketName" />
            </Form.Item>
          </>
        )}

        {type == 3 && (
          <>
            <Form.Item name="qcloudDomain" label="域名" rules={[{ required: type == 3, message: '请输入域名' }]}>
              <Input placeholder="请输入域名" />
            </Form.Item>
            <Form.Item
              name="qcloudPrefix"
              label="路径前缀"
              rules={[{ required: type == 3, message: '请输入路径前缀' }]}
            >
              <Input placeholder="请输入路径前缀" />
            </Form.Item>
            <Form.Item
              name="qcloudSecretId"
              label="腾讯云SecretId"
              rules={[{ required: type == 3, message: '请输入腾讯云SecretId' }]}
            >
              <Input placeholder="腾讯云SecretId" />
            </Form.Item>
            <Form.Item
              name="qcloudSecretKey"
              label="腾讯云SecretKey"
              rules={[{ required: type == 3, message: '请输入腾讯云SecretKey' }]}
            >
              <Input placeholder="腾讯云SecretKey" />
            </Form.Item>
            <Form.Item
              name="qcloudBucketName"
              label="腾讯云BucketName"
              rules={[{ required: type == 3, message: '请输入BucketName' }]}
            >
              <Input placeholder="BucketName" />
            </Form.Item>
            <Form.Item name="qcloudRegion" label="Bucket所属地区">
              <Input placeholder="设置bucket所在的区域，最新sdk不再支持简写，请填写完整" />
            </Form.Item>
          </>
        )}
      </ModalContent>
      <ModalFooter>
        <Button>取消</Button>
        <Button type="primary" loading={loading} htmlType="submit">
          确定
        </Button>
      </ModalFooter>
    </Form>
  );
}
