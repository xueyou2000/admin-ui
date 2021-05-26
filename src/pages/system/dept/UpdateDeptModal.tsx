import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { Button, Form, Input, InputNumber, message, Select, TreeSelect } from 'antd';
import React from 'react';
import { updateDept } from './service';
import { useSystemDepts } from './utils';
import merge from 'lodash/merge';
import { FormattedMessage, useIntl } from 'umi';

export default function UpdateDeptModal({ model }: { model: Dept }) {
  const intl = useIntl();
  const { loading, submitHandle } = useSubmit<Dept>(data =>
    updateDept(merge({}, model, data)).then(() => {
      message.success(intl.formatMessage({ id: 'DeptPage.updateSuccess', defaultMessage: '修改部门成功' }));
    }),
  );
  const { depts } = useSystemDepts(intl.formatMessage({ id: 'DeptPage.empty', defaultMessage: '无' }));

  return (
    <Form<Dept>
      onFinish={submitHandle}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      initialValues={model}
    >
      <ModalContent>
        <Form.Item
          name="parentId"
          label={<FormattedMessage id="Dept.parentId" defaultMessage="上级部门" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.parentId.required', defaultMessage: '请选择上级部门' }),
            },
          ]}
        >
          <TreeSelect
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            treeData={depts}
            placeholder={intl.formatMessage({ id: 'Dept.parentId', defaultMessage: '上级部门' })}
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item
          name="deptName"
          label={<FormattedMessage id="Dept.deptName" defaultMessage="部门名称" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.deptName.required', defaultMessage: '请输入部门名称' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Dept.deptName', defaultMessage: '部门名称' })} />
        </Form.Item>
        <Form.Item
          name="orderNum"
          label={<FormattedMessage id="Dept.orderNum" defaultMessage="显示顺序" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.orderNum.required', defaultMessage: '请输入显示顺序' }),
            },
          ]}
        >
          <InputNumber placeholder={intl.formatMessage({ id: 'Dept.orderNum', defaultMessage: '显示顺序' })} />
        </Form.Item>
        <Form.Item
          name="leader"
          label={<FormattedMessage id="Dept.leader" defaultMessage="负责人" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.leader.required', defaultMessage: '请输入负责人' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Dept.leader', defaultMessage: '负责人' })} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={<FormattedMessage id="Dept.phone" defaultMessage="联系电话" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.phone.required', defaultMessage: '请输入联系电话' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Dept.phone', defaultMessage: '联系电话' })} />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.email.required', defaultMessage: '请输入邮箱' }),
            },
          ]}
        >
          <Input placeholder={intl.formatMessage({ id: 'Dept.email', defaultMessage: '邮箱' })} />
        </Form.Item>
        <Form.Item
          name="status"
          label={<FormattedMessage id="Dept.status" defaultMessage="状态" />}
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'Dept.status.required', defaultMessage: '请选择状态' }),
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
