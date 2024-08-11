import React, { createContext, ReactNode, useState } from "react";
import useAuth from "../../hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { token, user, loading, handleLogin, handleLogout, amountCurrent, setAmountCurrent } = useAuth();

  return (
    <AuthContext.Provider value={{ token, user, loading, handleLogin, handleLogout, amountCurrent, setAmountCurrent }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
