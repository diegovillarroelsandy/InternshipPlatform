import React, { createContext, useState, useEffect } from "react";
import { getUser as getUserFromStorage } from "../utils/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al montar el provider, carga el usuario desde localStorage
    const storedUser = getUserFromStorage();
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};