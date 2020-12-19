import { Divider, PageHeader } from 'antd';
import { css } from '@emotion/css';
import CurrentUser from './CurrentUser';

export default function Header() {
  const currentUser = {
    name: 'Arnelle Balane',
    email: 'arnellebalane@gmail.com',
    avatar: 'https://en.gravatar.com/userimage/33051310/aa9e838f780505306ee5559df8aa9cb7.jpeg',
  };
  const headerExtra = currentUser ? <CurrentUser user={currentUser} /> : null;

  return (
    <>
      <PageHeader title="WebAuthn API" backIcon={false} extra={headerExtra} className={headerClass} />
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
