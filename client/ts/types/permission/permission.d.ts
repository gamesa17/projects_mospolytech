import { PermissionKey, PermissionTargetKey } from "@ts/enums";
import { Model } from "../model";

export interface Permission extends Model {
  key: PermissionKey;
  targetUserId: Model["id"];
  targetUserIdKey: PermissionTargetKey;
  targetCourseId: Model["id"];
  targetCourseIdKey: PermissionTargetKey;
}
