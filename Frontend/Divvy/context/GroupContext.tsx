// // context/GroupContext.tsx
 import React, { createContext, useContext, useState } from 'react';

//  type Member = {
//    id: number;
//    name: string;
//    avatar: any;
//    color: string;
//  };

//  type Group = {
//    id: string;
//    name: string;
//    members: Member[];
//  };

//  type Split = {
//     name: string;
//     amount: number;
//   };

// // type GroupContextType = {
// //   groups: Group[];
// //   addGroup: (name: string, members: Member[]) => void;
// // };

// // const GroupContext = createContext<GroupContextType>({
// //   groups: [],
// //   addGroup: () => {},
// // });

// // export const GroupProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
// //   const [groups, setGroups] = useState<Group[]>([]);

// //   const addGroup = (name: string, members: Member[]) => {
// //     const newGroup = {
// //       id: Math.random().toString(36).substring(7),
// //       name,
// //       members,
// //     };
// //     setGroups(prev => [...prev, newGroup]);
// //   };

// //   return (
// //     <GroupContext.Provider value={{ groups, addGroup }}>
// //       {children}
// //     </GroupContext.Provider>
// //   );
// // };

// // export const useGroups = () => useContext(GroupContext);


// type Expense = {
//     id: string;
//     name: string;
//     amount: number;
//     groupId: string;
//     paidBy: Member;
//     splitOption: 'Evenly' | 'Custom' | 'Percentage';
//     splits: Split[];
//     notes: string;
//     urgency: string;
//     receipt?: string;
//     date: string;
//   };
  
//   type GroupContextType = {
//     groups: Group[];
//     addGroup: (name: string, members: Member[]) => void;
//     expenses: Expense[];
//     addExpense: (expense: Expense) => void;
//   };
  
//   const GroupContext = createContext<GroupContextType>({
//     groups: [],
//     addGroup: () => {},
//     expenses: [],
//     addExpense: () => {},
//   });
  
//   export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const [groups, setGroups] = useState<Group[]>([]);
//     const [expenses, setExpenses] = useState<Expense[]>([]);
  
//     const addGroup = (name: string, members: Member[]) => {
//       const newGroup = {
//         id: Math.random().toString(36).substring(7),
//         name,
//         members,
//       };
//       setGroups(prev => [...prev, newGroup]);
//     };
  
//     const addExpense = (expense: Expense) => {
//       setExpenses(prev => [...prev, { ...expense, id: Math.random().toString(36).substring(7) }]);
//     };
  
//     return (
//       <GroupContext.Provider value={{ groups, addGroup, expenses, addExpense }}>
//         {children}
//       </GroupContext.Provider>
//     );
//   };
  
//   export const useGroups = () => useContext(GroupContext);


// GroupContext.tsx

type Member = {
    id: string;
    name: string;
    avatar?: any;
    color?: string;
    amount?: number;
    percentage?: number;
  };
  
  type Group = {
    id: string;
    name: string;
    members: Member[];
  };
  
  type Expense = {
    id: string;
    name: string;
    amount: number;
    groupId: string;
    paidBy: Member;
    splitOption: 'Evenly' | 'Custom' | 'Percentage';
    splits: Member[];
    notes: string;
    urgency: string;
    receipt?: string;
    date: string;
  };
  
  type GroupContextType = {
    groups: Group[];
    addGroup: (name: string, members: Member[]) => void;
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    currentUser: Member | null;
    setCurrentUser: (user: Member) => void;
  };
  
  const GroupContext = createContext<GroupContextType>({
    groups: [],
    addGroup: () => {},
    expenses: [],
    addExpense: () => {},
    currentUser: null,
    setCurrentUser: () => {},
  });
  
  export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [currentUser, setCurrentUser] = useState<Member | null>(null);
  
    // const addGroup = (name: string, members: Member[]) => {
    //   const newGroup = {
    //     id: Math.random().toString(36).substring(7),
    //     name,
    //     members,
    //   };
    //   setGroups(prev => [...prev, newGroup]);
    // };

    const addGroup = (name: string, members: Member[]) => {
        const currentUserId = currentUser?.id;
      
        // Ensure the current user is included
        const updatedMembers = currentUserId
          ? [...members.filter(m => m.id !== currentUserId), currentUser]
          : members;
      
        const newGroup = {
          id: Math.random().toString(36).substring(7),
          name,
          members: updatedMembers,
        };
      
        setGroups(prev => [...prev, newGroup]);
      };
      
  
    const addExpense = (expense: Expense) => {
      setExpenses(prev => [...prev, { ...expense, id: Math.random().toString(36).substring(7) }]);
    };
  
    return (
      <GroupContext.Provider value={{ groups, addGroup, expenses, addExpense, currentUser, setCurrentUser }}>
        {children}
      </GroupContext.Provider>
    );
  };
  
  export const useGroups = () => useContext(GroupContext);
  
  