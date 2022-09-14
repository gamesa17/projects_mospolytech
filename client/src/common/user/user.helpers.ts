export const getFullUserName = <UserType extends { username: string; firstName?: string; lastName?: string }>(
  user: UserType
): string => (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username);
