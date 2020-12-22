import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Select } from 'antd';
import React from 'react';
import { addDictType } from './service';

export default function AddDictTypeModal() {
  const { loading, submitHandle } = useSubmit<DictType>(data =>
    addDictType(data).then(() => {
      message.success('新增字典类型成功');
    }),
  );

  return (
    <Form<DictType>
      onFinish={submitHandle}
      initialValues={{ status: 'TRUE' }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="dictName" label="字典名称" rules={[{ required: true, message: '请输入字典名称' }]}>
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item name="dictType" label="字典类型" rules={[{ required: true, message: '请输入字典类型' }]}>
          <Input placeholder="请输入字典类型" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select<string>>
            <Select.Option value="TRUE">正常</Select.Option>
            <Select.Option value="FALSE">禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input.TextArea placeholder="请输入字典备注" rows={6} />
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
