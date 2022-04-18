import { GenericObject } from "@common/genericObject";
import { UserRole } from "@ts/enums";

export const ROLES = GenericObject.keys<UserRole>(UserRole);
