import HasPermission from '@/components/Authorized/HasPermission';
import { SuperTable } from '@/components/SuperTable';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal, Switch, Tree } from 'antd';
import React, { useRef } from 'react';
import { changeStatus, queryUserByPage, removeUser } from './service';
import { useDepts } from './utils';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
import RestPwdModal from './RestPwdModal';
import modalPopup from '@/components/ModalPopup';
import { autoQuery } from '@/utils/page-utils';
import { connect, FormattedMessage, RawIntlProvider, useIntl, UserModelState } from 'umi';

function UserQuery({ currentUser }: { currentUser: SystemUser }) {
  const actionRef = useRef<ActionType>();
  const { depts, deptsFlat } = useDepts(currentUser);
  const deptIdRef = useRef<number | null>(null);
  const intl = useIntl();

  function handleAdd() {
    modalPopup(
      <AddUserModal currentUser={currentUser} deptId={deptIdRef.current === null ? undefined : deptIdRef.current} />,
      { title: intl.formatMessage({ id: 'UserPage.addUser', defaultMessage: '新增用户' }) },
      autoQuery(actionRef),
    );
  }

  function handleUpdate(record: SystemUser) {
    modalPopup(
      <UpdateUserModal currentUser={currentUser} user={record} />,
      { title: intl.formatMessage({ id: 'UserPage.updateUser', defaultMessage: '修改用户' }) },
      autoQuery(actionRef),
    );
  }

  function handleRestPwd(record: SystemUser) {
    modalPopup(
      <RestPwdModal user={record} />,
      { title: intl.formatMessage({ id: 'UserPage.restPwd', defaultMessage: '重置密码' }), width: 400 },
      autoQuery(actionRef),
    );
  }

  function handleRemove(ids: string[]) {
    Modal.confirm({
      title: intl.formatMessage({ id: 'UserPage.removeTips', defaultMessage: '是否删除所选用户?' }),
      onOk: () =>
        removeUser(ids).then(() => {
          message.success(intl.formatMessage({ id: 'UserPage.removeOk', defaultMessage: '删除成功!' }));
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleChangeStatus(record: SystemUser) {
    const nextStatus = record.status === '0' ? '1' : '0';
    Modal.confirm({
      title: intl.formatMessage({ id: 'common.warning', defaultMessage: '警告' }),
      content: (
        <p>
          <RawIntlProvider value={intl}>
            <FormattedMessage
              id="UserPage.changeStatus"
              defaultMessage="是否要将{name}的状态改为"
              values={{ name: record.userName }}
            />
            <span style={{ color: '#FF5722' }}>
              {nextStatus === '0' ? (
                <FormattedMessage id="common.normal" defaultMessage="正常" />
              ) : (
                <FormattedMessage id="common.disabled" defaultMessage="禁用" />
              )}
            </span>
            ?
          </RawIntlProvider>
        </p>
      ),
      onOk: () =>
        changeStatus(record.userId, nextStatus).then(() => {
          message.success(intl.formatMessage({ id: 'common.operOk', defaultMessage: '操作成功' }));
          actionRef.current?.reload();
        }),
    });
  }

  function handleDeptSelecte(keys: any[]) {
    const deptId: number = keys[0];
    deptIdRef.current = deptId;
    actionRef.current?.reload();
  }

  const columns: ProColumns<SystemUser>[] = [
    {
      title: intl.formatMessage({ id: 'User.loginName', defaultMessage: '用户名' }),
      dataIndex: 'loginName',
    },
    {
      title: intl.formatMessage({ id: 'User.userName', defaultMessage: '昵称' }),
      dataIndex: 'userName',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'User.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'sys_oper_status.normal', defaultMessage: '正常' }), status: 'Success' },
        '1': { text: intl.formatMessage({ id: 'sys_oper_status.disabled', defaultMessage: '禁用' }), status: 'Error' },
      },
      renderText: (_, record) => {
        return <Switch checked={record.status === '0'} onChange={() => handleChangeStatus(record)}></Switch>;
      },
    },
    {
      title: intl.formatMessage({ id: 'User.deptId', defaultMessage: '部门' }),
      dataIndex: 'deptId',
      hideInSearch: false,
      renderText: (_, record) => {
        const dept = deptsFlat.find(x => x.deptId === record.deptId);
        return dept?.deptName || 'UnKnow';
      },
    },
    {
      title: intl.formatMessage({ id: 'User.createTime', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'common.oper', defaultMessage: '操作' }),
      width: '180px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:user:update">
            <a onClick={() => handleUpdate(record)}>
              <FormattedMessage id="common.edit" defaultMessage="编辑" />
            </a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:user:resetPwd">
            <a onClick={() => handleRestPwd(record)}>
              <FormattedMessage id="UserPage.restPwd" defaultMessage="重置密码" />
            </a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:user:remove">
            <a onClick={() => handleRemove([record.userId])}>
              <FormattedMessage id="common.delete" defaultMessage="删除" />
            </a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<SystemUser>
        headerTitle={<FormattedMessage id="UserPage.title" defaultMessage="用户管理" />}
        rowKey="userId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryUserByPage({ ...params, deptId: deptIdRef.current === null ? undefined : deptIdRef.current }).then(
            page => {
              return { success: true, data: page.records, total: page.total };
            },
          )
        }
        tableRender={(_, dom) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
            }}
          >
            <div style={{ width: 256, padding: '20px', background: '#fff', borderRight: '1px solid #f0f0f0' }}>
              <Tree
                blockNode={true}
                showIcon={true}
                showLine={true}
                defaultExpandAll={true}
                autoExpandParent={true}
                treeData={depts}
                selectable={true}
                onSelect={handleDeptSelecte}
              />
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
          </div>
        )}
        toolBarRender={() => [
          <HasPermission key="add" authority="system:user:add">
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
}))(UserQuery);
