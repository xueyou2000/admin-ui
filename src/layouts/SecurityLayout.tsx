import AuthWapper from '@/components/Authorized/AuthWapper';
import { UserModelState } from '@/models/user';
import { PageLoading } from '@ant-design/pro-layout';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { connect, ConnectProps, Redirect } from 'umi';

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean;
  currentUser: SystemUser | null;
}

function SecurityLayout(props: Partial<SecurityLayoutProps> & { children: React.ReactNode }) {
  const { dispatch, loading, currentUser, location, children } = props;
  const [isReady, setIsReady] = useState(false);
  const isLogin = currentUser && currentUser.userId;

  useEffect(() => {
    setIsReady(true);
    if (dispatch) {
      dispatch({ type: 'user/fetchCurrent' });
    }
  }, []);

  if ((!isLogin && loading) || !isReady) {
    return <PageLoading />;
  }
  if (!isLogin && location && location.pathname !== '/user/login') {
    return <Redirect to={`/user/login?redirect=${location.pathname}`} />;
  }

  return children;
}

const SecurityLayoutWapper = connect(({ user, loading }: { user: UserModelState; loading: EffectLoaing }) => ({
  currentUser: user.currentUser,
  loading: loading.effects['user/fetchCurrent'],
}))(SecurityLayout);

export default function _wapper({ children }: PropsWithChildren<{}>) {
  return (
    <AuthWapper>
      <SecurityLayoutWapper>{children}</SecurityLayoutWapper>
    </AuthWapper>
  );
}
