import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, InputNumber, message, Select, TreeSelect } from 'antd';
import React from 'react';
import { updateDept } from './service';
import { useSystemDepts } from './utils';
import merge from 'lodash/merge';

export default function UpdateDeptModal({ model }: { model: Dept }) {
  const { loading, submitHandle } = useSubmit<Dept>(data =>
    updateDept(merge({}, model, data)).then(() => {
      message.success('修改部门成功');
    }),
  );
  const { depts } = useSystemDepts();

  return (
    <Form<Dept>
      onFinish={submitHandle}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      initialValues={model}
    >
      <ModalContent>
        <Form.Item name="parentId" label="上级部门" rules={[{ required: true, message: '请选择上级部门' }]}>
          <TreeSelect
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            treeData={depts}
            placeholder="上级部门"
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item name="deptName" label="部门名称" rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder="请输入部门名称" />
        </Form.Item>
        <Form.Item name="orderNum" label="显示顺序" rules={[{ required: true, message: '请输入显示顺序' }]}>
          <InputNumber placeholder="显示顺序" />
        </Form.Item>
        <Form.Item name="leader" label="负责人" rules={[{ required: true, message: '请输入负责人' }]}>
          <Input placeholder="请输入负责人" />
        </Form.Item>
        <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
          <Input placeholder="请输入联系电话" />
        </Form.Item>
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select>
            <Select.Option value="0">正常</Select.Option>
            <Select.Option value="1">停用</Select.Option>
          </Select>
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
