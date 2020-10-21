import { Tabs } from 'antd';
import React from 'react';
import { useAliveController } from 'react-activation';
import { connect, ConnectProps, FormattedMessage, GlobalModelState, IRoute, useHistory, useLocation } from 'umi';

interface KeepAliveTabsProps extends ConnectProps {
  /** 扁平路由配置 */
  flatRoute: Record<string, IRoute>;
}

function KeepAliveTabs(props: React.PropsWithChildren<Partial<KeepAliveTabsProps>>) {
  const { flatRoute = {} } = props;
  const { getCachingNodes, dropScope, refreshScope } = useAliveController();
  const cachingNodes = getCachingNodes();
  const location = useLocation();
  const history = useHistory();

  function handleTabChange(path: string) {
    if (path === location.pathname) {
      refreshScope(path);
    } else {
      history.push(path);
    }
  }

  function handleEdit(path: any, action: 'add' | 'remove') {
    if (action === 'remove') {
      if (cachingNodes.length <= 1) {
        return;
      }
      // 关闭激活中的 KeepAlive Tab，需要先离开当前路由
      // 触发 KeepAlive unactivated 后再进行 drop
      if (location.pathname === path) {
        var unlisten = history.listen(() => {
          setTimeout(() => {
            unlisten();
            dropScope(path);
          }, 60);
        });
        // 前往排除当前 node 后的最后一个 tab
        const cachingNode = cachingNodes.filter(n => n.name !== path).pop();
        history.push(cachingNode?.name || '/');
      } else {
        dropScope(path);
      }
    }
  }

  return (
    <Tabs
      activeKey={location.pathname}
      onChange={handleTabChange}
      onEdit={handleEdit}
      animated={true}
      hideAdd={true}
      type="editable-card"
    >
      {cachingNodes.map(node => (
        <Tabs.TabPane
          key={node.name}
          tabKey={node.name}
          tab={<FormattedMessage id={`menu.${flatRoute[node.name || '']?.name}`} defaultMessage={node.name} />}
        />
      ))}
    </Tabs>
  );
}

export default connect(({ global }: { global: GlobalModelState }) => ({
  flatRoute: global.flatRoute,
}))(KeepAliveTabs);
