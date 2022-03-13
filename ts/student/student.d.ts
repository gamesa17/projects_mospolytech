import { User } from "@ts/user";
import { Model } from "@ts/model";

export interface Student extends Model {
  user: User;
}
