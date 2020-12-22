import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Select, InputNumber } from 'antd';
import React from 'react';
import { addDictData } from '../service';

export default function AddDictDataModal({ dictType }: { dictType: string }) {
  const { loading, submitHandle } = useSubmit<DictType>(data =>
    addDictData(Object.assign({}, data, { dictType })).then(() => {
      message.success('新增字典数据成功');
    }),
  );

  return (
    <Form<DictType>
      onFinish={submitHandle}
      initialValues={{ status: 'TRUE', dictSort: 0, isDefault: 'FALSE' }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="dictLabel" label="字典标签" rules={[{ required: true, message: '请输入字典标签' }]}>
          <Input placeholder="请输入字典标签" />
        </Form.Item>
        <Form.Item name="dictType" label="字典键值" rules={[{ required: true, message: '请输入字典键值' }]}>
          <Input placeholder="请输入字典键值" />
        </Form.Item>
        <Form.Item name="dictSort" label="字典排序" rules={[{ required: true, message: '请输入字典排序' }]}>
          <InputNumber step={1} placeholder="请输入字典排序" />
        </Form.Item>
        <Form.Item name="cssClass" label="样式属性">
          <Input placeholder="请输入样式属性" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select<string>>
            <Select.Option value="TRUE">正常</Select.Option>
            <Select.Option value="FALSE">禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="isDefault" label="是否默认">
          <Select<string>>
            <Select.Option value="TRUE">默认</Select.Option>
            <Select.Option value="FALSE">非默认</Select.Option>
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
