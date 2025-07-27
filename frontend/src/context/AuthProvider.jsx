import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider() {
  const [user, setUser] = useState();

  
  return (
    <AuthContext.Provider value={(login, logut)}>
      AuthProvider
    </AuthContext.Provider>
  );
}

export default AuthProvider;
