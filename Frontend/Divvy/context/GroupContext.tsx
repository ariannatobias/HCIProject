// context/GroupContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Member = {
  id: number;
  name: string;
  avatar: any;
  color: string;
};

type Group = {
  id: string;
  name: string;
  members: Member[];
};

type GroupContextType = {
  groups: Group[];
  addGroup: (name: string, members: Member[]) => void;
};

const GroupContext = createContext<GroupContextType>({
  groups: [],
  addGroup: () => {},
});

export const GroupProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [groups, setGroups] = useState<Group[]>([]);

  const addGroup = (name: string, members: Member[]) => {
    const newGroup = {
      id: Math.random().toString(36).substring(7),
      name,
      members,
    };
    setGroups(prev => [...prev, newGroup]);
  };

  return (
    <GroupContext.Provider value={{ groups, addGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroups = () => useContext(GroupContext);