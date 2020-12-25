import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Radio } from 'antd';
import React from 'react';
import { addConfig } from './service';

export default function AddConfigModal() {
  const { loading, submitHandle } = useSubmit<Config>(data =>
    addConfig(data).then(() => {
      message.success('新增系统配置成功');
    }),
  );

  return (
    <Form<Config>
      onFinish={submitHandle}
      initialValues={{ configType: 'FALSE' }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="configName" label="参数名称" rules={[{ required: true, message: '请输入参数名称' }]}>
          <Input placeholder="请输入参数名称" />
        </Form.Item>
        <Form.Item name="configKey" label="参数键名" rules={[{ required: true, message: '请输入参数键名' }]}>
          <Input placeholder="请输入参数键名" />
        </Form.Item>
        <Form.Item name="configType" label="系统内置">
          <Radio.Group>
            <Radio value="TRUE">是</Radio>
            <Radio value="FALSE">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="configValue" label="参数键值" rules={[{ required: true, message: '请输入参数键值' }]}>
          <Input.TextArea placeholder="请输入参数键值" rows={6} />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input.TextArea rows={3} />
        </Form.Item>
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
