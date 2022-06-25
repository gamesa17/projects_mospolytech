import { UserRole } from "@ts/enums";
import { User } from "@ts/types";

type Users = "Tom" | "Alex" | "John" | "Alexia";

export const USERS: Record<Users, User> = {
  Tom: {
    id: 0,
    role: UserRole.STUDENT,
    username: "tom_smit",
    firstName: "Tom",
    lastName: "Smit",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  Alex: {
    id: 1,
    role: UserRole.STUDENT,
    username: "alex.gates.2005",
    firstName: "Alex",
    lastName: "Gates",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
  },
  John: {
    id: 2,
    role: UserRole.STUDENT,
    username: "john_black",
    firstName: "Johnathan",
    lastName: "Black",
  },
  Alexia: {
    id: 3,
    role: UserRole.TEACHER,
    username: "alexia_waker",
    firstName: "Alexia",
    lastName: "Waker",
  },
};
