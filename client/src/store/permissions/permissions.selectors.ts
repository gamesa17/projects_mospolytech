import { RootState } from "@client/store/store.types";
import { PermissionsState } from "@client/store/permissions/permissions.types";
import { Capabilities } from "@ts/types";
import { PermissionKey } from "@ts/enums";

export const selectPermissionsRoot = (state: RootState): PermissionsState => state.permissions;

export const selectPermissions = (state: RootState): PermissionKey[] => state.permissions.permissions;

export const selectCapabilities = (state: RootState): Capabilities => {
  const permissions = selectPermissions(state);

  return {
    canReadUserProfileSpecificUsers: permissions.includes(PermissionKey.READ_USER_PROFILE_SPECIFIC_USERS),
    canReadUserProfileAnyUsersSpecificCourses: permissions.includes(
      PermissionKey.READ_USER_PROFILE_ANY_USERS_SPECIFIC_COURSES
    ),
    canUpdateUserProfileSpecificUsers: permissions.includes(PermissionKey.UPDATE_USER_PROFILE_SPECIFIC_USERS),
    canDeleteUserProfileSpecificUsers: permissions.includes(PermissionKey.DELETE_USER_PROFILE_SPECIFIC_USERS),

    canCreateHomeworkSpecificCourses: permissions.includes(PermissionKey.CREATE_HOMEWORK_SPECIFIC_COURSES),
    canReadAssignedHomeworkSpecificUsers: permissions.includes(PermissionKey.READ_ASSIGNED_HOMEWORK_SPECIFIC_USERS),
    canReadCreatedHomeworkSpecificUsers: permissions.includes(PermissionKey.READ_CREATED_HOMEWORK_SPECIFIC_USERS),
    canUpdateHomeworkSpecificCourses: permissions.includes(PermissionKey.UPDATE_HOMEWORK_SPECIFIC_COURSES),
    canUpdateHomeworkDoneStatusSpecificUsers: permissions.includes(
      PermissionKey.UPDATE_HOMEWORK_DONE_STATUS_SPECIFIC_USERS
    ),
    canDeleteHomeworkSpecificCourses: permissions.includes(PermissionKey.DELETE_HOMEWORK_SPECIFIC_COURSES),

    canCreateCourses: permissions.includes(PermissionKey.CREATE_COURSES),
    canReadSpecificCourses: permissions.includes(PermissionKey.READ_SPECIFIC_COURSES),
    canUpdateSpecificCourses: permissions.includes(PermissionKey.UPDATE_SPECIFIC_COURSES),
    canUpdateSpecificCoursesMembers: permissions.includes(PermissionKey.UPDATE_SPECIFIC_COURSES_MEMBERS),
    canDeleteSpecificCourses: permissions.includes(PermissionKey.DELETE_SPECIFIC_COURSES),
  };
};
