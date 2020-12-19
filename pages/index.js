import AuthButtons from '@/components/AuthButtons';
import DataFeed from '@/components/DataFeed';

export default function Home() {
  const currentUser = {
    name: 'Arnelle Balane',
    email: 'arnellebalane@gmail.com',
    avatar: 'https://en.gravatar.com/userimage/33051310/aa9e838f780505306ee5559df8aa9cb7.jpeg',
  };

  return (
    <main>
      {currentUser && <AuthButtons />}

      <DataFeed />
    </main>
  );
}
