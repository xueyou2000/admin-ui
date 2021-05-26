import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, message, Select, TreeSelect } from 'antd';
import React, { useEffect, useState } from 'react';
import { findAllRole } from '../role/service';
import { updateUser, selectUserById } from './service';
import { useDepts } from './utils';
import merge from 'lodash/merge';
import { FormattedMessage, useIntl } from 'umi';

export default function UpdateUserModal({ user, currentUser }: { user: SystemUser; currentUser: SystemUser }) {
  const intl = useIntl();
  const [form] = Form.useForm();
  const { depts } = useDepts(currentUser);
  const { loading, submitHandle } = useSubmit<SystemUser>(data =>
    updateUser(merge({}, user, data)).then(() => {
      message.success(intl.formatMessage({ id: 'UserPage.updateSuccess', defaultMessage: '修改用户成功' }));
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
        <Form.Item
          name="loginName"
          label={<FormattedMessage id="User.loginName" defaultMessage="用户名" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'User.loginName.required', defaultMessage: '请输入用户名' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'User.loginName.placeholder', defaultMessage: '登陆账号' })} />
        </Form.Item>
        <Form.Item
          name="userName"
          label={<FormattedMessage id="User.userName" defaultMessage="昵称" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'User.userName.placeholder', defaultMessage: '请输入昵称' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'User.userName.placeholder', defaultMessage: '起一个名字' })} />
        </Form.Item>
        <Form.Item
          name="status"
          label={<FormattedMessage id="User.status" defaultMessage="状态" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'User.status.placeholder', defaultMessage: '请选择状态' }),
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
        <Form.Item
          name="deptId"
          label={<FormattedMessage id="User.deptId" defaultMessage="部门" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'User.deptId.required', defaultMessage: '请选择部门' }),
            },
          ]}
        >
          <TreeSelect
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            treeData={depts}
            placeholder={intl.formatMessage({ id: 'User.deptId.placeholder', defaultMessage: '所属部门' })}
            treeDefaultExpandAll
          ></TreeSelect>
        </Form.Item>
        <Form.Item name="remark" label={<FormattedMessage id="User.remark" defaultMessage="描述" />}>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item name="roleIds" label={<FormattedMessage id="User.roleIds" defaultMessage="拥有角色" />}>
          <Select showArrow={true} optionFilterProp="label" mode="multiple" options={roles} showSearch />
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
