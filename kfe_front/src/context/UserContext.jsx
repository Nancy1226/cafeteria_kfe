import { createContext, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [isLoged, setIsLoged] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <UserContext.Provider value={{ isLoged, setIsLoged, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
