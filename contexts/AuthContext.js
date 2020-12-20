import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AUTH_STATE = {
  UNKNOWN: undefined,
  UNAUTHENTICATED: null,
};

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(AUTH_STATE.UNKNOWN);
  const [token, setToken] = useState(AUTH_STATE.UNKNOWN);

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
