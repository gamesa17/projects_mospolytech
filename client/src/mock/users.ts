import { User } from "@ts/user";
import { UserRole } from "@ts/user/user.enums";

type Users = "Tom" | "Alex" | "John" | "Alexia";

export const USERS: Record<Users, User> = {
  Tom: {
    id: 0,
    role: UserRole.STUDENT,
    username: "tom_smit",
    firstName: "Tom",
    lastName: "Smit",
  },
  Alex: {
    id: 1,
    role: UserRole.STUDENT,
    username: "alex.gates.2005",
    firstName: "Alex",
    lastName: "Gates",
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
