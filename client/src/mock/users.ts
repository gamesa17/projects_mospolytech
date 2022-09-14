import { User } from "@ts/types";
import { UserRole } from "@ts/enums";

type Users = "Tom" | "Alex" | "John" | "Alexia" | "Jessica";

export const USERS: Record<Users, User> = {
  Tom: {
    id: 0,
    role: UserRole.STUDENT,
    username: "tom_smit",
    firstName: "Tom",
    lastName: "Smit",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    email: "tom_smit@gmail.com",
    phone: "+16811152762",
    languages: [],
  },
  Alex: {
    id: 1,
    role: UserRole.STUDENT,
    username: "alex.gates.2005",
    firstName: "Alex",
    lastName: "Gates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "alex.gates.2005@gmail.com",
    phone: "+79145567848",
    languages: [],
  },
  John: {
    id: 2,
    role: UserRole.STUDENT,
    username: "john_black",
    firstName: "Johnathan",
    lastName: "Black",
    email: "john_black@gmail.com",
    phone: "+79140985756",
    languages: [],
  },
  Alexia: {
    id: 3,
    role: UserRole.TEACHER,
    username: "alexia_waker",
    firstName: "Alexia",
    lastName: "Waker",
    email: "alexia_waker@gmail.com",
    phone: "+10157326688",
    languages: [],
  },
  Jessica: {
    id: 3,
    role: UserRole.TEACHER,
    username: "jessica_roland",
    firstName: "Jessica",
    lastName: "Roland",
    email: "jessica_roland@gmail.com",
    phone: "+16822210203",
    languages: [],
  },
};
