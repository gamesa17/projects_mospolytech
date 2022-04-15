import { User } from "@ts/user";
import { Model } from "@ts/model";
import { Language } from "@ts/language";

export interface Teacher extends Model, User {
  languages: Language[];
}
