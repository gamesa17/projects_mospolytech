import { User } from "@ts/user";
import { UserRole } from "@ts/user/user.enums";

type Users = "Tom" | "Alex" | "John" | "Alexia";

export const USERS: Record<Users, User> = {
  Tom: {
    id: 0,
    role: UserRole.STUDENT,
    login: "tom_smit",
    firstName: "Tom",
    lastName: "Smit",
  },
  Alex: {
    id: 1,
    role: UserRole.STUDENT,
    login: "alex.gates.2005",
    firstName: "Alex",
    lastName: "Gates",
  },
  John: {
    id: 2,
    role: UserRole.STUDENT,
    login: "john_black",
    firstName: "Johnathan",
    lastName: "Black",
  },
  Alexia: {
    id: 3,
    role: UserRole.TEACHER,
    login: "alexia_waker",
    firstName: "Alexia",
    lastName: "Waker",
  },
};
