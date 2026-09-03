import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [member, setMember] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (memberData, tokenData, roleData = "Member") => {
    setMember(memberData);
    setToken(tokenData);
    setRole(roleData);
  };

  const logout = () => {
    setMember(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ member, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
