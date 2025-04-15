// context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

// type User = {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   // any other backend-provided fields
// };
type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    name: string; // 🔥 Combined full name
  };
  


type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
