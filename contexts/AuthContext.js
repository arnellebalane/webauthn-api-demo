import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const value = {
    user,
    token,
    setUser,
    setToken(value) {
      setToken(value);
      localStorage.setItem('token', value);
    },
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
