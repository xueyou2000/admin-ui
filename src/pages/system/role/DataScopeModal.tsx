import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Divider, Form, Input, InputNumber, message, Select, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDepts } from './utils';
import { authDataScopeSave } from './service';
import merge from 'lodash/merge';
import { getDeptIdsByRole } from '../dept/service';

export default function DataScopeModal({ role }: { role: Role }) {
  const { depts } = useDepts();
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [dataScope, setDataScope] = useState(role.dataScope);
  const { loading, submitHandle } = useSubmit<RoleModel>(data =>
    authDataScopeSave(merge({}, role, data, { deptIds: checkedKeys })).then(() => {
      message.success('修改数据权限成功');
    }),
  );

  useEffect(() => {
    getDeptIdsByRole(role.roleId).then(res => {
      // 因为antd 树插件勾选父节点会导致所有子节点选中,所以过滤所有父节点
      setCheckedKeys(res);
    });
  }, []);

  return (
    <Form<RoleModel>
      onFinish={submitHandle}
      initialValues={role}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder="起一个名字" disabled={true} />
        </Form.Item>
        <Form.Item name="roleKey" label="权限字符" rules={[{ required: true, message: '请输入权限字符' }]}>
          <Input placeholder="请输入权限字符" disabled={true} />
        </Form.Item>
        <Form.Item
          name="dataScope"
          label="数据权限"
          rules={[{ required: true, message: '请选择数据权限' }]}
          extra="特殊情况下，设置为“自定数据权限”"
        >
          <Select<string> onChange={setDataScope}>
            <Select.Option value="1">全部数据权限</Select.Option>
            <Select.Option value="2">自定数据权限</Select.Option>
            <Select.Option value="3">部门数据权限</Select.Option>
            <Select.Option value="4">部门及以下数据权限</Select.Option>
            <Select.Option value="5">仅本人数据权限</Select.Option>
          </Select>
        </Form.Item>

        {dataScope == '2' && (
          <Form.Item label="拥有权限">
            <Tree
              checkable={true}
              treeData={depts}
              checkedKeys={checkedKeys}
              onCheck={keys => setCheckedKeys(keys as number[])}
            />
          </Form.Item>
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
