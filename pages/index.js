import { useAuth } from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const { token } = useAuth();
  const notLoggedIn = !Boolean(token);

  return (
    <main>
      {notLoggedIn && <AuthButtons />}

      <DataFeed />
    </main>
  );
}
