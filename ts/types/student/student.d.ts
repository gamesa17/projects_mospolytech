import { Model, User } from "@ts/types";

export interface Student extends Model, User {
  new?: boolean;
}
