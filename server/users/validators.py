from django.db.models import Q

from users.models import User, UserRole


class UserValidators:
    USERNAME_MIN_LENGTH = 6
    USERNAME_ACCEPTED_SYMBOLS = "abcdefghijklmnopqrstuvwxyz0123456789-_.@"
    PASSWORD_MIN_LENGTH = 6

    @staticmethod
    def IsUserExists(username) -> bool:
        return User.objects.filter(Q(username=username) & ~Q(username="admin")).exists()

    @staticmethod
    def IsValidUserRole(role) -> bool:
        return role in [UserRole.STUDENT, UserRole.TEACHER]

    @staticmethod
    def IsValidUsername(username) -> bool:
        if len(username) < UserValidators.USERNAME_MIN_LENGTH:
            return False

        return all(symbol in UserValidators.USERNAME_ACCEPTED_SYMBOLS for symbol in username)

    @staticmethod
    def IsValidPassword(password) -> bool:
        return len(password) >= UserValidators.PASSWORD_MIN_LENGTH
