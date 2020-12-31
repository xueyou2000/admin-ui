import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Divider, Form, Input, InputNumber, message, Select, Tree } from 'antd';
import React, { useRef, useState } from 'react';
import { useSystemPermissions } from '../menu/utils';
import { addRole } from './service';

export default function AddRoleModal() {
  const { permissions } = useSystemPermissions(false);
  const halfCheckedKeys = useRef([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const { loading, submitHandle } = useSubmit<RoleModel>(data =>
    addRole(Object.assign({}, data, { menuIds: checkedKeys.concat(halfCheckedKeys.current) })).then(() => {
      message.success('新增角色成功');
    }),
  );

  function handleCheck(checkedKeys: any, info: any) {
    setCheckedKeys(checkedKeys);
    halfCheckedKeys.current = info.halfCheckedKeys;
  }

  return (
    <Form<RoleModel>
      onFinish={submitHandle}
      initialValues={{ status: '0', roleSort: 1 }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="起一个名字" />
        </Form.Item>
        <Form.Item name="roleKey" label="权限字符" rules={[{ required: true, message: '请输入权限字符' }]}>
          <Input placeholder="请输入权限字符" />
        </Form.Item>
        <Form.Item name="roleSort" label="显示顺序" rules={[{ required: true, message: '请输入显示顺序' }]}>
          <InputNumber placeholder="显示顺序" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select>
            <Select.Option value="0">正常</Select.Option>
            <Select.Option value="1">停用</Select.Option>
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item label="拥有权限">
          <Tree checkable={true} treeData={permissions} checkedKeys={checkedKeys} onCheck={handleCheck} />
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
