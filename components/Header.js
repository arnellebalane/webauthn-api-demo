import Link from 'next/link';
import { Divider, PageHeader } from 'antd';
import { css } from '@emotion/css';
import { useAuth } from '@/contexts/AuthContext';
import CurrentUser from './CurrentUser';

export default function Header() {
  const { user } = useAuth();
  const headerExtra = user ? <CurrentUser user={user} /> : null;

  const title = <Link href="/">WebAuthn API</Link>;

  return (
    <>
      <PageHeader title={title} backIcon={false} extra={headerExtra} className={headerClass} />
      <Divider className={dividerClass} />
    </>
  );
}

const headerClass = css`
  padding-left: 0;
  padding-right: 0;
`;

const dividerClass = css`
  margin-top: 0;
`;
