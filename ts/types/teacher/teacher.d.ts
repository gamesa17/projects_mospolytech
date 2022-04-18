import { User, Model, Language } from "@ts/types";

export interface Teacher extends Model, User {
  languages: Language[];
}
