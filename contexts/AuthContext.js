import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AUTH_STATE = {
  UNKNOWN: undefined,
  UNAUTHENTICATED: null,
};

const TOKEN_STORAGE_KEY = 'token';

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(AUTH_STATE.UNKNOWN);
  const [token, setToken] = useState(AUTH_STATE.UNKNOWN);

  const value = {
    user,
    token,
    setUser,
    setToken(value) {
      setToken(value);
      if (value) {
        localStorage.setItem(TOKEN_STORAGE_KEY, value);
      } else {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      }
    },
    setAuth({ user, token }) {
      value.setUser(user);
      value.setToken(token);
    },
    signOut() {
      value.setUser(null);
      value.setToken(null);
    },
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  const { token, user, setUser, signOut } = auth;

  useEffect(() => {
    if (token && !user) {
      (async () => {
        try {
          const response = await fetch('/api/session', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = await response.json();

          if (response.status >= 400 && response.status <= 599) {
            return signOut();
          }

          setUser(user);
        } catch (error) {
          signOut();
        }
      })();
    }
  }, [token]);

  return auth;
}

export default AuthContext;
