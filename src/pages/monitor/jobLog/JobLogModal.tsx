import ModalContent from '@/components/ModalPopup/ModalContent';
import { dictToValueEnum, useDicts } from '@/utils/page-utils';
import { CloseOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Modal, Space } from 'antd';
import React, { useRef } from 'react';
import { cleanJobLog, queryJobLogByPage, removeJobLog } from './service';

export default function JobLogModal({ jobId }: { jobId: number }) {
  const actionRef = useRef<ActionType>();
  const dictMaps = useDicts({
    sys_job_group: [],
    job_run_status: [],
  });

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选日志?',
      onOk: () =>
        removeJobLog(ids).then(() => {
          message.success('删除日志成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  function handleClean() {
    Modal.confirm({
      title: '是否清空所有定时任务日志',
      onOk: () =>
        cleanJobLog().then(() => {
          message.success('清空成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<JobLog>[] = [
    {
      title: '日志编号',
      dataIndex: 'jobLogId',
    },
    {
      title: '任务名称',
      dataIndex: 'jobName',
    },
    {
      title: '日志信息',
      dataIndex: 'jobMessage',
    },
    {
      title: '异常信息',
      dataIndex: 'exceptionInfo',
    },
    {
      title: '执行状态',
      dataIndex: 'status',
      valueEnum: dictToValueEnum(dictMaps.job_run_status),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      width: '150px',
      dataIndex: 'action',
      render: (_, record) => (
        <>
          <a onClick={() => handleRemove([record.jobLogId])}>删除</a>
        </>
      ),
    },
  ];

  return (
    <ModalContent>
      <ProTable<JobLog>
        search={false}
        rowKey="jobLogId"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        request={params =>
          queryJobLogByPage({ ...params, jobId }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        toolBarRender={() => [
          <Button key="add" type="ghost" danger onClick={handleClean}>
            <CloseOutlined /> 清空
          </Button>,
        ]}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRows }) => {
          return (
            <Space size={16}>
              <a onClick={() => handleRemove(selectedRows.map(x => x.jobLogId))}>批量删除</a>
            </Space>
          );
        }}
      />
    </ModalContent>
  );
}
