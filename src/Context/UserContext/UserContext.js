import { createContext, useReducer, useContext } from "react";
import { initialState, userReducer } from "./UserReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[userState, userDispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
