import React, {useState, createContext} from "react";

export const AuthContext = createContext();

export const AuthContextProvider = props => {
  const [appUser, setAppUser] = useState()

  return (
    <AuthContext.Provider value={[appUser, setAppUser]}>
      {props.children}
    </AuthContext.Provider>
  );
}

