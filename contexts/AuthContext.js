import { useState, createContext } from 'react';

const AuthContext = createContext({ user: null, setUser: () => {} });

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Arnelle Balane',
    email: 'arnellebalane@gmail.com',
    avatar: 'https://en.gravatar.com/userimage/33051310/aa9e838f780505306ee5559df8aa9cb7.jpeg',
  });

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
