import { useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    name: "Parisa",
    age: 25,
    family: "Shahbazi",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
