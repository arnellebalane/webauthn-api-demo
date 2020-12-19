import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const { user } = useContext(AuthContext);
  const notLoggedIn = !Boolean(user);

  return (
    <main>
      {notLoggedIn && <AuthButtons />}

      <DataFeed />
    </main>
  );
}
