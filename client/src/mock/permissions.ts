import { PermissionKey } from "@ts/enums";

type Users = "Tom" | "Alex" | "John" | "Alexia" | "Jessica";

const STUDENT_PERMISSIONS = [
  PermissionKey.READ_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.UPDATE_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.DELETE_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.READ_USER_PROFILE_ANY_USERS_SPECIFIC_COURSES,
  PermissionKey.READ_ASSIGNED_HOMEWORK_SPECIFIC_USERS,
  PermissionKey.UPDATE_HOMEWORK_DONE_STATUS_SPECIFIC_USERS,
  PermissionKey.READ_SPECIFIC_COURSES,
];

const TEACHER_PERMISSIONS = [
  PermissionKey.READ_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.UPDATE_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.DELETE_USER_PROFILE_SPECIFIC_USERS,
  PermissionKey.READ_USER_PROFILE_ANY_USERS_SPECIFIC_COURSES,
  PermissionKey.CREATE_HOMEWORK_SPECIFIC_COURSES,
  PermissionKey.READ_CREATED_HOMEWORK_SPECIFIC_USERS,
  PermissionKey.UPDATE_HOMEWORK_SPECIFIC_COURSES,
  PermissionKey.DELETE_HOMEWORK_SPECIFIC_COURSES,
  PermissionKey.CREATE_COURSES,
  PermissionKey.READ_SPECIFIC_COURSES,
  PermissionKey.UPDATE_SPECIFIC_COURSES,
  PermissionKey.UPDATE_SPECIFIC_COURSES_MEMBERS,
  PermissionKey.DELETE_SPECIFIC_COURSES,
];

export const PERMISSIONS: Record<Users, PermissionKey[]> = {
  Tom: [...STUDENT_PERMISSIONS],
  Alex: [...STUDENT_PERMISSIONS],
  John: [...STUDENT_PERMISSIONS],
  Alexia: [...TEACHER_PERMISSIONS],
  Jessica: [...TEACHER_PERMISSIONS],
};
