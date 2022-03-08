import { GenericObject } from "@common/genericObject";
import { UserRole } from "@ts/user/user.enums";

export const ROLES = GenericObject.keys<UserRole>(UserRole);
