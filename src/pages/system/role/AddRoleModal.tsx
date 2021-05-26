import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Divider, Form, Input, InputNumber, message, Select, Tree } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { useSystemPermissions } from '../menu/utils';
import { addRole } from './service';

export default function AddRoleModal() {
  const intl = useIntl();
  const { permissions } = useSystemPermissions(false);
  const halfCheckedKeys = useRef([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const { loading, submitHandle } = useSubmit<RoleModel>(data =>
    addRole(Object.assign({}, data, { menuIds: checkedKeys.concat(halfCheckedKeys.current) })).then(() => {
      message.success(intl.formatMessage({ id: 'RolePage.addSuccess', defaultMessage: '新增角色成功' }));
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
        <Form.Item
          name="roleName"
          label={<FormattedMessage id="Role.roleName" defaultMessage="角色名称" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Role.roleName.required', defaultMessage: '请输入角色名称' }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({ id: 'Role.roleName.placeholder', defaultMessage: '请输入角色名称' })}
          />
        </Form.Item>
        <Form.Item
          name="roleKey"
          label={<FormattedMessage id="Role.roleKey" defaultMessage="权限字符串" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Role.roleKey.required', defaultMessage: '请输入权限字符' }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({ id: 'Role.roleKey.placeholder', defaultMessage: '请输入权限字符' })}
          />
        </Form.Item>
        <Form.Item
          name="roleSort"
          label={<FormattedMessage id="Role.roleSort" defaultMessage="显示顺序" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Role.roleSort.required', defaultMessage: '请输入显示顺序' }),
            },
          ]}
        >
          <InputNumber placeholder={intl.formatMessage({ id: 'Role.roleSort', defaultMessage: '显示顺序' })} />
        </Form.Item>
        <Form.Item
          name="status"
          label={<FormattedMessage id="Role.status" defaultMessage="角色状态" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Role.status.required', defaultMessage: '请选择状态' }),
            },
          ]}
        >
          <Select>
            <Select.Option value="0">
              <FormattedMessage id="sys_oper_status.normal" defaultMessage="正常" />
            </Select.Option>
            <Select.Option value="1">
              <FormattedMessage id="sys_oper_status.disabled" defaultMessage="禁用" />
            </Select.Option>
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item label={<FormattedMessage id="RolePage.permissions" defaultMessage="拥有权限" />}>
          <Tree checkable={true} treeData={permissions} checkedKeys={checkedKeys} onCheck={handleCheck} />
        </Form.Item>
      </ModalContent>
      <ModalFooter>
        <Button>
          <FormattedMessage id="common.cancel" defaultMessage="取消" />
        </Button>
        <Button type="primary" loading={loading} htmlType="submit">
          <FormattedMessage id="common.confirm" defaultMessage="确定" />
        </Button>
      </ModalFooter>
    </Form>
  );
}
