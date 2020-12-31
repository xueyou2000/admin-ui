import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Select, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { findAllRole } from '../role/service';
import { updateUser, selectUserById } from './service';
import { useDepts } from './utils';
import merge from 'lodash/merge';

export default function UpdateUserModal({ user }: { user: SystemUser }) {
  const [form] = Form.useForm();
  const { depts } = useDepts();
  const { loading, submitHandle } = useSubmit<SystemUser>(data =>
    updateUser(merge({}, user, data)).then(() => {
      message.success('修改用户成功');
    }),
  );
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => {
    findAllRole().then(res => setRoles(res.map(x => ({ label: x.roleName, value: x.roleId }))));
    selectUserById(user.userId).then(res => form.setFieldsValue(res));
  }, []);

  return (
    <Form<SystemUser>
      form={form}
      onFinish={submitHandle}
      initialValues={{ ...user }}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="loginName" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input placeholder="登陆账号" />
        </Form.Item>
        <Form.Item name="userName" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
          <Input placeholder="起一个名字" />
        </Form.Item>
        <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select>
            <Select.Option value="0">正常</Select.Option>
            <Select.Option value="1">停用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="deptId" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
          <TreeSelect
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            treeData={depts}
            placeholder="所属部门"
            treeDefaultExpandAll
          ></TreeSelect>
        </Form.Item>
        <Form.Item name="remark" label="描述">
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="roleIds" label="拥有角色">
          <Select showArrow={true} optionFilterProp="label" mode="multiple" options={roles} showSearch />
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
