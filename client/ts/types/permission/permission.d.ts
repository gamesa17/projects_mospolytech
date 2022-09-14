import { PermissionKey, PermissionTargetKey } from "@ts/enums";
import { Model, ModelId } from "@ts/types";

export interface Permission extends Model {
  key: PermissionKey;
  targetUserId: ModelId;
  targetUserIdKey: PermissionTargetKey;
  targetCourseId: ModelId;
  targetCourseIdKey: PermissionTargetKey;
}
