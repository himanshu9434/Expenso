import { createContext } from "react"

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    userName:null,
    // token: null,
    login: () => {},
    logout: () => {}
  });