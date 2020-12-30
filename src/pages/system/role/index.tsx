import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { autoQuery } from '@/utils/page-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal } from 'antd';
import React, { useRef } from 'react';
import { queryRoleByPage, removeRole } from './service';
import AddRoleModal from './AddRoleModal';
import UpdateRoleModal from './UpdateRoleModal';
import DataScopeModal from './DataScopeModal';

export default function RoleQuery() {
  const actionRef = useRef<ActionType>();

  function handleAdd() {
    modalPopup(<AddRoleModal />, { title: '新增角色' }, autoQuery(actionRef));
  }

  function handleUpdate(record: Role) {
    modalPopup(<UpdateRoleModal role={record} />, { title: '修改角色' }, autoQuery(actionRef));
  }

  function handleDataScope(record: Role) {
    modalPopup(<DataScopeModal role={record} />, { title: '数据权限' }, autoQuery(actionRef));
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选角色?',
      onOk: () =>
        removeRole(ids).then(() => {
          message.success('删除成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Role>[] = [
    {
      title: '角色Id',
      dataIndex: 'roleId',
      search: false,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '权限字符串',
      dataIndex: 'roleKey',
    },
    {
      title: '显示顺序',
      dataIndex: 'roleSort',
    },
    {
      title: '数据范围',
      dataIndex: 'dataScope',
      valueEnum: {
        '1': { text: '全部数据权限', status: 'Success' },
        '2': { text: '自定数据权限', status: 'Success' },
        '3': { text: '部门数据权限', status: 'Success' },
        '4': { text: '部门及以下数据权限', status: 'Success' },
        '5': { text: '仅本人数据权限', status: 'Success' },
      },
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      valueEnum: {
        '0': { text: '正常', status: 'Success' },
        '1': { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '操作',
      width: '180px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:role:update">
            <a onClick={() => handleUpdate(record)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:role:update">
            <a onClick={() => handleDataScope(record)}>数据权限</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:role:remove">
            <a onClick={() => handleRemove([record.roleId])}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Role>
        headerTitle="角色"
        rowKey="roleId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryRoleByPage({ ...params }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="system:role:add">
            <Button type="primary" onClick={handleAdd}>
              <PlusOutlined /> 新建
            </Button>
          </HasPermission>,
        ]}
      ></SuperTable>
    </PageContainer>
  );
}
