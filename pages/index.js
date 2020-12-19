import { useContext } from 'react';
import AuthContext from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const { user } = useContext(AuthContext);
  const notLoggedIn = !Boolean(user);

  const handleRegister = (data) => {
    console.log(data);
  };

  const handleLogin = (data) => {
    console.log(data);
  };

  return (
    <main>
      {notLoggedIn && <AuthButtons onRegister={handleRegister} onLogin={handleLogin} />}

      <DataFeed />
    </main>
  );
}
