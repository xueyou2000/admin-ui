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
import { connect, FormattedMessage, useIntl, UserModelState } from 'umi';

function RoleQuery({ currentUser }: { currentUser: SystemUser }) {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  function handleAdd() {
    modalPopup(
      <AddRoleModal />,
      { title: intl.formatMessage({ id: 'RolePage.addRole', defaultMessage: '新增角色' }) },
      autoQuery(actionRef),
    );
  }

  function handleUpdate(record: Role) {
    modalPopup(
      <UpdateRoleModal role={record} />,
      { title: intl.formatMessage({ id: 'RolePage.updateRole', defaultMessage: '修改角色' }) },
      autoQuery(actionRef),
    );
  }

  function handleDataScope(record: Role) {
    modalPopup(
      <DataScopeModal role={record} />,
      { title: intl.formatMessage({ id: 'RolePage.dataScope', defaultMessage: '数据权限' }) },
      autoQuery(actionRef),
    );
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: intl.formatMessage({ id: 'RolePage.removeTips', defaultMessage: '是否删除所选角色?' }),
      onOk: () =>
        removeRole(ids).then(() => {
          message.success(intl.formatMessage({ id: 'RolePage.removeOk', defaultMessage: '删除成功!' }));
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Role>[] = [
    {
      title: intl.formatMessage({ id: 'Role.roleId', defaultMessage: '角色Id' }),
      dataIndex: 'roleId',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'Role.roleName', defaultMessage: '角色名称' }),
      dataIndex: 'roleName',
    },
    {
      title: intl.formatMessage({ id: 'Role.roleKey', defaultMessage: '权限字符串' }),
      dataIndex: 'roleKey',
    },
    {
      title: intl.formatMessage({ id: 'Role.roleSort', defaultMessage: '显示顺序' }),
      dataIndex: 'roleSort',
    },
    {
      title: intl.formatMessage({ id: 'Role.dataScope', defaultMessage: '数据范围' }),
      dataIndex: 'dataScope',
      valueEnum: {
        '1': { text: intl.formatMessage({ id: 'sys_data_scope.all', defaultMessage: '数据范围' }), status: 'Success' },
        '2': {
          text: intl.formatMessage({ id: 'sys_data_scope.custom', defaultMessage: '自定义数据权限' }),
          status: 'Success',
        },
        '3': {
          text: intl.formatMessage({ id: 'sys_data_scope.dept', defaultMessage: '部门数据权限' }),
          status: 'Success',
        },
        '4': {
          text: intl.formatMessage({ id: 'sys_data_scope.deptChild', defaultMessage: '部门及以下数据权限' }),
          status: 'Success',
        },
        '5': {
          text: intl.formatMessage({ id: 'sys_data_scope.self', defaultMessage: '仅本人数据权限' }),
          status: 'Success',
        },
      },
    },
    {
      title: intl.formatMessage({ id: 'Role.status', defaultMessage: '角色状态' }),
      dataIndex: 'status',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'sys_oper_status.normal', defaultMessage: '正常' }), status: 'Success' },
        '1': { text: intl.formatMessage({ id: 'sys_oper_status.disabled', defaultMessage: '禁用' }), status: 'Error' },
      },
    },
    {
      title: intl.formatMessage({ id: 'common.oper', defaultMessage: '操作' }),
      width: '180px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          {/* 自己当前的角色不允许修改 */}
          <HasPermission
            authority="system:role:update"
            isAuthority={currentUser.roleIds.find(roleId => roleId === record.roleId) == null}
          >
            <a onClick={() => handleUpdate(record)}>
              <FormattedMessage id="common.edit" defaultMessage="编辑" />
            </a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission
            authority="system:role:update"
            isAuthority={currentUser.roleIds.find(roleId => roleId === record.roleId) == null}
          >
            <a onClick={() => handleDataScope(record)}>
              <FormattedMessage id="RolePage.dataScope" defaultMessage="数据权限" />
            </a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission
            authority="system:role:remove"
            isAuthority={currentUser.roleIds.find(roleId => roleId === record.roleId) == null}
          >
            <a onClick={() => handleRemove([record.roleId])}>
              <FormattedMessage id="common.delete" defaultMessage="删除" />
            </a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Role>
        headerTitle={<FormattedMessage id="RolePage.title" defaultMessage="角色管理" />}
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
              <PlusOutlined /> <FormattedMessage id="common.add" defaultMessage="新建" />
            </Button>
          </HasPermission>,
        ]}
      ></SuperTable>
    </PageContainer>
  );
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(RoleQuery);
