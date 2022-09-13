import { Homework } from "@ts/types";

import { COURSES } from "./courses";

const DAY = 1000 * 60 * 60 * 24;

type Homeworks = "HW_0" | "HW_1" | "HW_2";

export const HOMEWORKS: Record<Homeworks, Homework> = {
  HW_0: {
    id: 0,
    name: "Homework 1",
    description: "Description 1",
    link: "google.com",
    course: COURSES.Group01English,
    created: new Date().toISOString(),
    deadline: new Date(Date.now() + DAY * 7).toISOString(),
  },
  HW_1: {
    id: 1,
    name: "Homework 2",
    description: "Description 2",
    course: COURSES.Group02French,
    created: new Date().toISOString(),
    deadline: new Date(Date.now() + DAY * 1).toISOString(),
  },
  HW_2: {
    id: 2,
    name: "Homework 3",
    description: "Description 3",
    course: COURSES.Group01English,
    created: new Date(Date.now() + DAY * 2).toISOString(),
    deadline: new Date(Date.now() + DAY * 30).toISOString(),
  },
};
