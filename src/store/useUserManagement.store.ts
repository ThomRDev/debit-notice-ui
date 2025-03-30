import { create } from "zustand";

interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "1", name: "Ricardo Mendoza" },
  // { id: "2", name: "Sofía Carranza" },
  // { id: "3", name: "Pedro Valdivia" },
  // { id: "4", name: "Elena Ramirez" },
  // { id: "5", name: "Miguel Ángel Torres" },
];

const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

const useUserManagementStore = create<User>(() => getRandomUser());

export default useUserManagementStore;
