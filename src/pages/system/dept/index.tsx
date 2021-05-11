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
import { connect, UserModelState } from 'umi';

function DeptQuery({ currentUser }: { currentUser: SystemUser }) {
  const actionRef = useRef<ActionType>();

  function handleAdd(parentId?: number) {
    modalPopup(<AddDeptModal parentId={parentId} />, { title: '新增部门' }, autoQuery(actionRef));
  }

  function handleUpdate(record: Dept) {
    modalPopup(<UpdateDeptModal model={record} />, { title: '修改部门' }, autoQuery(actionRef));
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选部门?',
      onOk: () =>
        removeDept(ids).then(() => {
          message.success('删除成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Dept>[] = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
    },
    {
      title: '排序',
      dataIndex: 'orderNum',
      search: false,
    },
    {
      title: '负责人',
      dataIndex: 'leader',
      search: false,
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        '0': { text: '正常', status: 'Success' },
        '1': { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
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
              <a onClick={() => handleUpdate(record)}>编辑</a>
              <Divider type="vertical" />
            </HasPermission>

            <HasPermission
              authority="system:dept:add"
              isAuthority={ancestors.find(id => id == record.deptId + '') == null}
            >
              <a onClick={() => handleAdd(record.deptId)}>新增</a>
              <Divider type="vertical" />
            </HasPermission>

            <HasPermission
              authority="system:dept:remove"
              isAuthority={ancestors.find(id => id == record.deptId + '') == null}
            >
              <a onClick={() => handleRemove([record.deptId])}>删除</a>
            </HasPermission>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Dept>
        headerTitle="部门"
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
              <PlusOutlined /> 新建
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
