export type Capabilities = {
  canReadUserProfileSpecificUsers: boolean;
  canReadUserProfileAnyUsersSpecificCourses: boolean;
  canUpdateUserProfileSpecificUsers: boolean;
  canDeleteUserProfileSpecificUsers: boolean;

  canCreateHomeworkSpecificCourses: boolean;
  canReadAssignedHomeworkSpecificUsers: boolean;
  canReadCreatedHomeworkSpecificUsers: boolean;
  canUpdateHomeworkSpecificCourses: boolean;
  canUpdateHomeworkDoneStatusSpecificUsers: boolean;
  canDeleteHomeworkSpecificCourses: boolean;

  canCreateCourses: boolean;
  canReadSpecificCourses: boolean;
  canUpdateSpecificCourses: boolean;
  canUpdateSpecificCoursesMembers: boolean;
  canDeleteSpecificCourses: boolean;
};
