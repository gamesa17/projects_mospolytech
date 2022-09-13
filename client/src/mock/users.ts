import { UserRole } from "@ts/enums";
import { User } from "@ts/types";

type Users = "Tom" | "Alex" | "John" | "Alexia" | "Jessica";

export const USERS: Record<Users, User> = {
  Tom: {
    id: 0,
    role: UserRole.STUDENT,
    username: "tom_smit",
    firstName: "Tom",
    lastName: "Smit",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    city: "Toronto",
    phone: "+16811152762",
  },
  Alex: {
    id: 1,
    role: UserRole.STUDENT,
    username: "alex.gates.2005",
    firstName: "Alex",
    lastName: "Gates",
    avatar: "https://randomuser.me/api/portraits/men/31.jpg",
    city: "Moscow",
    phone: "+79145567848",
  },
  John: {
    id: 2,
    role: UserRole.STUDENT,
    username: "john_black",
    firstName: "Johnathan",
    lastName: "Black",
    city: "Khabarovsk",
    phone: "+79140985756",
  },
  Alexia: {
    id: 3,
    role: UserRole.TEACHER,
    username: "alexia_waker",
    firstName: "Alexia",
    lastName: "Waker",
    city: "California",
    phone: "+10157326688",
  },
  Jessica: {
    id: 3,
    role: UserRole.TEACHER,
    username: "jessica_roland",
    firstName: "Jessica",
    lastName: "Roland",
    city: "Toronto",
    phone: "+16822210203",
  },
};
