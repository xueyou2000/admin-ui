import HasPermission from '@/components/Authorized/HasPermission';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { autoQuery } from '@/utils/page-utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, message, Modal } from 'antd';
import React, { useRef } from 'react';
import { queryDeptByPage, removeDept } from './service';
import AddDeptModal from './AddDeptModal';
import UpdateDeptModal from './UpdateDeptModal';
import { treeData } from '@/utils/object-utils';
import { connect, FormattedMessage, useIntl, UserModelState } from 'umi';

function DeptQuery({ currentUser }: { currentUser: SystemUser }) {
  const actionRef = useRef<ActionType>();
  const intl = useIntl();

  function handleAdd(parentId?: number) {
    modalPopup(
      <AddDeptModal parentId={parentId} />,
      { title: intl.formatMessage({ id: 'DeptPage.addRole', defaultMessage: '新增部门' }) },
      autoQuery(actionRef),
    );
  }

  function handleUpdate(record: Dept) {
    modalPopup(
      <UpdateDeptModal model={record} />,
      { title: intl.formatMessage({ id: 'DeptPage.updateRole', defaultMessage: '修改部门' }) },
      autoQuery(actionRef),
    );
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: intl.formatMessage({ id: 'DeptPage.removeTips', defaultMessage: '是否删除所选部门?' }),
      onOk: () =>
        removeDept(ids).then(() => {
          message.success(intl.formatMessage({ id: 'DeptPage.removeOk', defaultMessage: '删除成功!' }));
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Dept>[] = [
    {
      title: intl.formatMessage({ id: 'Dept.deptName', defaultMessage: '部门名称' }),
      dataIndex: 'deptName',
    },
    {
      title: intl.formatMessage({ id: 'Dept.orderNum', defaultMessage: '排序' }),
      dataIndex: 'orderNum',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'Dept.leader', defaultMessage: '负责人' }),
      dataIndex: 'leader',
      search: false,
    },
    {
      title: intl.formatMessage({ id: 'Dept.phone', defaultMessage: '联系电话' }),
      dataIndex: 'phone',
    },
    {
      title: intl.formatMessage({ id: 'Dept.status', defaultMessage: '状态' }),
      dataIndex: 'status',
      valueEnum: {
        '0': { text: intl.formatMessage({ id: 'sys_oper_status.normal', defaultMessage: '正常' }), status: 'Success' },
        '1': { text: intl.formatMessage({ id: 'sys_oper_status.disabled', defaultMessage: '禁用' }), status: 'Error' },
      },
    },
    {
      title: intl.formatMessage({ id: 'Dept.createTime', defaultMessage: '创建时间' }),
      dataIndex: 'createTime',
    },
    {
      title: intl.formatMessage({ id: 'common.oper', defaultMessage: '操作' }),
      width: '180px',
      dataIndex: 'action',
      search: false,
      render: (_, record) => {
        // 不允许操作自己以上级部门的信息
        const ancestors = (currentUser?.dept.ancestors || '').split(',');
        return (
          <>
            <HasPermission
              authority="system:dept:update"
              isAuthority={ancestors.find(id => id == record.deptId + '') == null}
            >
              <a onClick={() => handleUpdate(record)}>
                <FormattedMessage id="common.edit" defaultMessage="编辑" />
              </a>
              <Divider type="vertical" />
            </HasPermission>

            <HasPermission
              authority="system:dept:add"
              isAuthority={ancestors.find(id => id == record.deptId + '') == null}
            >
              <a onClick={() => handleAdd(record.deptId)}>
                <FormattedMessage id="common.add" defaultMessage="新建" />
              </a>
              <Divider type="vertical" />
            </HasPermission>

            <HasPermission
              authority="system:dept:remove"
              isAuthority={ancestors.find(id => id == record.deptId + '') == null}
            >
              <a onClick={() => handleRemove([record.deptId])}>
                <FormattedMessage id="common.delete" defaultMessage="删除" />
              </a>
            </HasPermission>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Dept>
        headerTitle={<FormattedMessage id="DeptPage.title" defaultMessage="部门管理" />}
        rowKey="deptId"
        columns={columns}
        pagination={false}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryDeptByPage({ ...params }).then(page => {
            const data = treeData(page.records, 'deptId', 'parentId', 'children', 0);
            return { success: true, data: data, total: page.total };
          })
        }
        toolBarRender={() => [
          <HasPermission key="add" authority="system:dept:add">
            <Button type="primary" onClick={() => handleAdd()}>
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
}))(DeptQuery);
