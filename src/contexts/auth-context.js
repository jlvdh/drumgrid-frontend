import React, { useState, createContext } from "react";
import AuthService from "../services/auth-service";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [appUser, setAppUser] = useState();
  const service = new AuthService();

  const makeLogin = async (username, password) => {
    let result = await service
      .login(username, password)
      .then((response) => {
        setAppUser(response);
      })
      .catch((error) => console.log(error));
      console.log("inside context", result);
  };

  const logout = async () => {
    let result = await service.logout();
    setAppUser(null);
    console.log('logged out', result)
  };

  // return <AuthContext.Provider value={[appUser, setAppUser]}>{props.children}</AuthContext.Provider>;
  return <AuthContext.Provider value={{appUser, makeLogin, logout}}>{props.children}</AuthContext.Provider>;
};
