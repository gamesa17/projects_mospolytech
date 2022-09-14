from django.contrib.auth import authenticate
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError

from authtokens.jwt_tokens import JWTTokens
from authtokens.validators import RequestValidator
from users.models import User
from users.validators import UserValidators


class SignupAPI(APIView):
    permission_classes = (permissions.AllowAny, )

    @staticmethod
    def post(request):
        try:
            if (
                not RequestValidator.ContainNotEmpty(
                    object=request.data,
                    fields=["username", "password", "role"],
                )
            ):
                return Response(
                    data={"error": "Недостаточно данных для регистрации"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            username = request.data["username"]
            password = request.data["password"]
            role = request.data["role"]

            if not UserValidators.IsValidUsername(username=username):
                return Response(
                    data={"error": "Имя пользователя является недопустимым"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not UserValidators.IsValidPassword(password=password):
                return Response(data={"error": "Пароль является недопустимым"}, status=status.HTTP_400_BAD_REQUEST)

            if not UserValidators.IsValidUserRole(role=role):
                return Response(
                    data={"error": "Роль пользователя является недопустимой"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if UserValidators.IsUserExists(username=username):
                return Response(data={"error": "Пользователь уже существует"}, status=status.HTTP_400_BAD_REQUEST)

            User.objects.create_user(username=username, password=password, role=role)

            return Response(status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LoginAPI(APIView):
    permission_classes = (permissions.AllowAny, )

    @staticmethod
    def post(request):
        try:
            if (not RequestValidator.ContainNotEmpty(object=request.data, fields=["username", "password"])):
                return Response(
                    data={"error": "Недостаточно данных для авторизации"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            username = request.data["username"]
            password = request.data["password"]

            user = authenticate(username=username, password=password)

            if user is None or not user.is_active:
                return Response(data={"error": "Неверный логин или пароль"}, status=status.HTTP_400_BAD_REQUEST)

            tokens = JWTTokens.GetTokensByUser(user=user)

            response = Response(status=status.HTTP_200_OK)

            JWTTokens.AddTokensToResponse(response=response, tokens=tokens)

            return response

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LogoutAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request):
        try:
            response = Response(status=status.HTTP_200_OK)

            refreshToken = request.COOKIES.get(JWTTokens.REFRESH_TOKEN_KEY)

            if refreshToken is None:
                return Response(data={"error": "Не авторизован"}, status=status.HTTP_401_UNAUTHORIZED)

            JWTTokens.OutdateTokens(refreshToken=refreshToken)
            response.delete_cookie(JWTTokens.REFRESH_TOKEN_KEY)

            return response

        except TokenError:
            return Response(data={"error": "Не авторизован"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TokenRefreshAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    @staticmethod
    def post(request):
        try:
            response = Response(status=status.HTTP_201_CREATED)

            refreshToken = request.COOKIES.get(JWTTokens.REFRESH_TOKEN_KEY)

            if refreshToken is None:
                return Response(data={"error": "Не авторизован"}, status=status.HTTP_401_UNAUTHORIZED)

            newTokens = JWTTokens.GetNewTokens(refreshToken)
            JWTTokens.AddTokensToResponse(response, newTokens)

            return response

        except TokenError:
            return Response(data={"error": "Не авторизован"}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as error:
            return Response(data={"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DeleteAccountAPI(APIView):
    @staticmethod
    def delete(request):
        try:
            User.objects.delete(id=request.user.id)

            return Response(status=status.HTTP_200_OK)

        except Exception as error:
            return Response({"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
