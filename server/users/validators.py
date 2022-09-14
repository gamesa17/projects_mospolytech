from users.models import User, UserRole


class UserValidators:
    USERNAME_MIN_LENGTH = 6
    USERNAME_ACCEPTED_SYMBOLS = "abcdefghijklmnopqrstuvwxyz0123456789-_.@"
    PASSWORD_MIN_LENGTH = 6

    @staticmethod
    def IsUserExists(username) -> bool:
        return User.objects.filter(username=username).exists()

    @staticmethod
    def IsValidUserRole(role) -> bool:
        return role in [UserRole.STUDENT, UserRole.TEACHER]

    @staticmethod
    def IsValidUsername(username) -> bool:
        if len(username) < UserValidators.USERNAME_MIN_LENGTH:
            return False

        if not all(symbol in UserValidators.USERNAME_ACCEPTED_SYMBOLS for symbol in username):
            return False

        return True

    @staticmethod
    def IsValidPassword(password) -> bool:
        if len(password) < UserValidators.PASSWORD_MIN_LENGTH:
            return False

        return True
