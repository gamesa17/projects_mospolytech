import { Language } from "@ts/types";

type Languages = "English" | "French" | "Germany";

export const LANGUAGES: Record<Languages, Language> = {
  English: {
    id: 0,
    name: "English",
  },
  French: {
    id: 1,
    name: "French",
  },
  Germany: {
    id: 2,
    name: "Germany",
  },
};
