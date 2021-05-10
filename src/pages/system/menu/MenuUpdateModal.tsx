import ModalContent from '@/components/ModalPopup/ModalContent';
import ModalFooter from '@/components/ModalPopup/ModalFooter';
import { useSubmit } from '@/utils/page-utils';
import { QuestionCircleOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, Switch, Tooltip, TreeSelect } from 'antd';
import React, { useState } from 'react';
import { updateSystemMenu } from './service';
import { useSystemPermissions } from './utils';
import merge from 'lodash/merge';

interface MenuUpdateModalProps {
  menu: SystemMenu;
}

export default function MenuUpdayeModal({ menu }: MenuUpdateModalProps) {
  const { permissions } = useSystemPermissions();
  const [menuType, setMenuType] = useState(menu.menuType);
  const { loading, submitHandle } = useSubmit<SystemMenu>(data =>
    updateSystemMenu(merge({}, menu, data)).then(() => {
      message.success('新增菜单权限成功');
    }),
  );

  return (
    <Form<SystemMenu>
      onFinish={submitHandle}
      initialValues={menu}
      labelCol={{ xs: { span: 24 }, sm: { span: 5 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <ModalContent>
        <Form.Item name="parentId" label="上级权限" rules={[{ required: true, message: '请选择上级权限' }]}>
          <TreeSelect
            dropdownStyle={{ maxHeight: '400px', overflow: 'auto' }}
            treeData={permissions}
            placeholder="上级权限"
            treeDefaultExpandAll
          ></TreeSelect>
        </Form.Item>
        <Form.Item name="menuType" label="菜单类型" rules={[{ required: true, message: '请选择类型' }]}>
          <Select<'M' | 'C' | 'F'> onChange={setMenuType}>
            <Select.Option value="M">目录</Select.Option>
            <Select.Option value="C">菜单</Select.Option>
            <Select.Option value="F">按钮</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="menuName" label="权限名称" rules={[{ required: true, message: '请输入权限名称' }]}>
          <Input placeholder="请输入权限名称(国际化key)" />
        </Form.Item>
        {menuType !== 'F' && (
          <Form.Item name="menuKey" label="路由唯一键" rules={[{ required: true, message: '请输入动态菜单唯一键' }]}>
            <Input placeholder="路由唯一键：如'user'" />
          </Form.Item>
        )}
        {menuType !== 'M' && (
          <Form.Item name="perms" label="权限标识">
            <Input placeholder="权限标识" />
          </Form.Item>
        )}

        {menuType !== 'F' && (
          <Form.Item name="icon" label="图标" required={false}>
            <Input prefix={<SmileOutlined />} placeholder="选择图标" allowClear={true} />
          </Form.Item>
        )}

        {menuType === 'C' && (
          <Form.Item name="target" label="打开方式" required={false}>
            <Select>
              <Select.Option value="">当前窗口</Select.Option>
              <Select.Option value="_blank">新窗口</Select.Option>
            </Select>
          </Form.Item>
        )}

        {menuType === 'C' && (
          <Form.Item
            name="path"
            required={false}
            label={
              <span>
                链接地址
                <Tooltip title="链接地址为外链时，打开方式必须为新窗口">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input placeholder="路径" />
          </Form.Item>
        )}

        <Form.Item name="redirect" label="重定向地址" required={false}>
          <Input placeholder="重定向地址" />
        </Form.Item>

        {menuType !== 'F' && (
          <Form.Item
            name="hiddenChildren"
            label="隐藏子菜单"
            required={false}
            getValueProps={val => ({ defaultChecked: val === 'TRUE' })}
            normalize={(val: boolean) => (val ? 'TRUE' : 'FALSE')}
          >
            <Switch />
          </Form.Item>
        )}

        <Form.Item name="orderNum" label="显示顺序" rules={[{ required: true, message: '请输入顺序数字' }]}>
          <InputNumber placeholder="显示顺序" />
        </Form.Item>

        <Form.Item name="visible" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
          <Select>
            <Select.Option value="0">显示</Select.Option>
            <Select.Option value="1">隐藏</Select.Option>
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
