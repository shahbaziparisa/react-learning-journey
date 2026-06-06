import { createContext } from "react";
interface User {
  name: string;
  age: number;
  family: string;
}
interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
export const UserContext = createContext<UserContextType | null>(null);
