import { SuperTable } from '@/components/SuperTable';
import { treeData } from '@/utils/object-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, DatePicker, Divider, Form } from 'antd';
import React, { useRef, useState } from 'react';
import { MenuType } from './enums';
import MenuAddModel from './MenuAddModal';
import { querySystemMenuList } from './service';

function SystemMenuQuery() {
  const actionRef = useRef<ActionType>();
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [row, setRow] = useState<SystemMenu>();

  const columns: ProColumns<SystemMenu>[] = [
    {
      title: '权限名称',
      dataIndex: 'menuName',
    },
    {
      title: '日期范围',
      dataIndex: ['dateRanges', 'createTime'],
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
      title: '组件',
      dataIndex: 'component',
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
      render: (_, record) => (
        <>
          <a>编辑</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setRow(record);
              setAddVisible(true);
            }}
          >
            新增
          </a>
          <Divider type="vertical" />
          <a>删除</a>
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
        search={{ labelWidth: 120 }}
        request={params =>
          querySystemMenuList({ ...params }).then(page => {
            const data = treeData(page.records, 'menuId', 'parentId', 'children', 0);
            return { success: true, data, total: page.total };
          })
        }
        toolBarRender={() => [
          <Button type="primary" onClick={() => setAddVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
      <MenuAddModel
        visible={addVisible}
        onVisibleChange={setAddVisible}
        onConfirm={() => actionRef.current?.reload()}
        parentId={row?.menuId}
      />
    </PageContainer>
  );
}

export default SystemMenuQuery;
