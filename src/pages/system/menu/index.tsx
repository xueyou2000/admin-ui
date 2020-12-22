import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { treeData } from '@/utils/object-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker, Divider, Form, message, Modal } from 'antd';
import React, { useRef } from 'react';
import { FormattedMessage } from 'umi';
import { MenuType } from './enums';
import { querySystemMenuList, removeSystemMenu } from './service';
import MenuAddModel from './MenuAddModal';
import MenuUpdateModal from './MenuUpdateModal';
import { autoQuery } from '@/utils/page-utils';
import { getMenuName } from './utils';
import HasPermission from '@/components/Authorized/HasPermission';

function SystemMenuQuery() {
  const actionRef = useRef<ActionType>();
  const records = useRef<SystemMenu[]>([]);

  function handleAdd(parentId?: number) {
    modalPopup(<MenuAddModel parentId={parentId} />, { title: '新增菜单/权限' }, autoQuery(actionRef));
  }

  function handleUpdate(menu: SystemMenu) {
    modalPopup(<MenuUpdateModal menu={menu} />, { title: '修改菜单/权限' }, autoQuery(actionRef));
  }

  function handleRemove(menu: SystemMenu) {
    Modal.confirm({
      title: '是否删除菜单?',
      onOk: () =>
        removeSystemMenu(menu.menuId).then(() => {
          message.success('删除菜单成功!');
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<SystemMenu>[] = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      search: false,
      renderText: (_: string, record) => {
        return getMenuName(record);
      },
    },
    {
      title: '日期范围',
      dataIndex: ['dateRanges', 'createTime'],
      hideInTable: true,
      renderFormItem: (item, config, form) => {
        return (
          <Form.Item name={item.dataIndex} label="">
            <DatePicker.RangePicker />
          </Form.Item>
        );
      },
    },
    {
      title: '路由唯一键',
      dataIndex: 'menuKey',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      valueType: 'digit',
    },
    {
      title: '按钮类型',
      dataIndex: 'menuType',
      renderText: (val: string) => MenuType[val].desc,
    },
    {
      title: '链接',
      dataIndex: 'path',
    },
    {
      title: '重定向',
      dataIndex: 'redirect',
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
    },
    {
      title: '状态',
      dataIndex: 'visible',
      valueEnum: {
        '0': { text: '显示', status: 'Success' },
        '1': { text: '隐藏', status: 'Error' },
      },
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:menu:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>

          {record.menuType !== 'F' && (
            <HasPermission authority="system:menu:add">
              <a onClick={() => handleAdd(record.menuId)}>新增</a>
              <Divider type="vertical" />
            </HasPermission>
          )}

          <HasPermission authority="system:menu:remove">
            <a onClick={() => handleRemove(record)}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<SystemMenu & TableQueryBase>
        headerTitle="菜单管理"
        rowKey="menuId"
        columns={columns}
        actionRef={actionRef}
        pagination={false}
        search={{
          layout: 'vertical',
        }}
        request={params =>
          querySystemMenuList({ ...params }).then(page => {
            const data = treeData(page.records, 'menuId', 'parentId', 'children', 0);
            records.current = data;
            return { success: true, data, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="system:menu:add">
            <Button type="primary" onClick={() => handleAdd()}>
              <PlusOutlined /> 新建
            </Button>
          </HasPermission>,
        ]}
      />
    </PageContainer>
  );
}

export default SystemMenuQuery;
