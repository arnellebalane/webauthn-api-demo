import { useState, createContext } from 'react';

const AuthContext = createContext({ user: null, setUser: () => {} });

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}

export default AuthContext;
