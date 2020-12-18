import { Divider, PageHeader } from 'antd';
import CurrentUser from '@/components/CurrentUser';
import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const currentUser = {
    name: 'Arnelle Balane',
    email: 'arnellebalane@gmail.com',
    avatar: 'https://en.gravatar.com/userimage/33051310/aa9e838f780505306ee5559df8aa9cb7.jpeg',
  };
  const headerExtra = currentUser ? <CurrentUser user={currentUser} /> : null;

  return (
    <main>
      <PageHeader title="WebAuthn API" backIcon={false} extra={headerExtra} />
      <Divider />

      {currentUser && <AuthButtons />}

      <DataFeed />
    </main>
  );
}
