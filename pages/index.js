import { useAuth } from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const { user } = useAuth();
  const notLoggedIn = !Boolean(user);

  return (
    <main>
      {notLoggedIn && <AuthButtons />}

      <DataFeed />
    </main>
  );
}
