import HasPermission from '@/components/Authorized/HasPermission';
import { hasPerms } from '@/components/Authorized/perms';
import modalPopup from '@/components/ModalPopup';
import { SuperTable } from '@/components/SuperTable';
import { getRequestUrl } from '@/config/app-config';
import { getAuthority } from '@/utils/authority';
import { isBadResponse } from '@/utils/page-utils';
import { CloudUploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Image, message, Modal } from 'antd';
import { useEffect, useRef } from 'react';
import { connect, UserModelState } from 'umi';
import { Upload } from 'xy-upload';
import CloudStorageConfigModal from './CloudStorageConfigModal';
import { getCloudStorageConfig, queryOssByPage, removeOss, updateOss } from './service';

function OssQuery({ currentUser }: { currentUser: SystemUser }) {
  const actionRef = useRef<ActionType>();
  const authority = getAuthority();
  const cloudStorageConfig = useRef<CloudStorageConfig | null>(null);

  function fetchConfig() {
    if (currentUser.admin === 'TRUE' || hasPerms('system.oss.config')) {
      getCloudStorageConfig().then(c => (cloudStorageConfig.current = c));
    }
  }

  useEffect(fetchConfig, []);

  function handleUpdateConfig() {
    if (cloudStorageConfig.current) {
      modalPopup(<CloudStorageConfigModal config={cloudStorageConfig.current} />, { title: '云存储配置' }, fetchConfig);
    }
  }

  function handleRemove(ids: number[]) {
    Modal.confirm({
      title: '是否删除所选文件?',
      onOk: () =>
        removeOss(ids).then(() => {
          message.success('删除成功!');
          if (actionRef.current?.clearSelected) {
            actionRef.current?.clearSelected();
          }
          actionRef.current?.reload();
        }),
    });
  }

  const columns: ProColumns<Oss>[] = [
    {
      title: '文件编号',
      dataIndex: 'id',
      editable: false,
      search: false,
    },
    {
      title: '文件名',
      dataIndex: 'fileName',
    },
    {
      title: '文件后缀',
      dataIndex: 'fileSuffix',
      editable: false,
      search: false,
    },
    {
      title: '文件预览',
      dataIndex: 'url',
      renderText: (_: string, record) => {
        return <Image width={70} src={_} />;
      },
      editable: false,
      search: false,
    },
    {
      title: '服务商',
      dataIndex: 'service',
      valueEnum: {
        '1': '七牛云',
        '2': '阿里云',
        '3': '腾讯云',
      },
      editable: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      editable: false,
      search: false,
    },
    {
      title: '操作',
      width: '180px',
      valueType: 'option',
      // search: false,
      // editable: false,
      render: (_, record) => (
        <>
          <HasPermission authority="system:oss:update">
            <a onClick={() => actionRef.current?.startEditable(record.id)}>编辑</a>
            <Divider type="vertical" />
          </HasPermission>

          <HasPermission authority="system:oss:remove">
            <a onClick={() => handleRemove([record.id])}>删除</a>
          </HasPermission>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <SuperTable<Oss>
        headerTitle="文件"
        rowKey="id"
        columns={columns}
        pagination={{ pageSize: 10 }}
        actionRef={actionRef}
        search={{ labelWidth: 120 }}
        request={params =>
          queryOssByPage({ ...params, sortNames: ['create_time'] }).then(page => {
            return { success: true, data: page.records, total: page.total };
          })
        }
        editable={{
          type: 'multiple',
          actionRender: (row, config) => [
            <a
              key="save"
              onClick={async () => {
                const values = (await config?.form?.validateFields()) as Oss;
                const hide = message.loading('保存中...');
                const newValue = { ...row, ...values[row.id] };
                try {
                  await updateOss(newValue);
                } catch (error) {
                  console.log('保存Oss失败: ', error.message);
                }
                await config.onSave?.(config.recordKey, newValue);
                hide();
              }}
            >
              保存
            </a>,
            <a
              key="cancel"
              onClick={async () => {
                await config.onCancel?.(config.recordKey, row);
              }}
            >
              取消
            </a>,
          ],
        }}
        toolBarRender={() => [
          <HasPermission key="config" authority="sys:oss:config">
            <Button type="primary" onClick={handleUpdateConfig}>
              <CloudUploadOutlined /> 云存储配置
            </Button>
          </HasPermission>,
          <HasPermission key="add" authority="system:oss:add">
            <Upload
              action={getRequestUrl('/system/oss/upload')}
              headers={{ token: authority?.token || '' }}
              onSuccess={(_, response) => {
                if (isBadResponse(response)) {
                  message.error('上传失败');
                } else {
                  message.success('上传成功');
                  actionRef.current?.reload();
                }
              }}
              onError={() => {
                message.error('上传失败');
              }}
              options={{ compress: true, quality: 0.7 }}
            >
              <Button>
                <CloudUploadOutlined /> 文件上传
              </Button>
            </Upload>
          </HasPermission>,
        ]}
      ></SuperTable>
    </PageContainer>
  );
}

export default connect(({ user }: { user: UserModelState }) => ({
  currentUser: user.currentUser,
}))(OssQuery);
