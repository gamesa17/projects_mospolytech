import { Level } from "@ts/types";

type Levels = "Beginner" | "Intermediate" | "Advanced";

export const LEVELS: Record<Levels, Level> = {
  Beginner: {
    id: 0,
    name: "Beginner",
  },
  Intermediate: {
    id: 1,
    name: "Intermediate",
  },
  Advanced: {
    id: 2,
    name: "Advanced",
  },
};
