from django.urls import path
from rest_framework_simplejwt.views import TokenVerifyView

from authtokens.api import DeleteAccountAPI, LoginAPI, LogoutAPI, SignupAPI, TokenRefreshAPI  # noqa I001
 # noqa I005
urlpatterns = [
    path("/delete", DeleteAccountAPI.as_view()),
    path("/token/verify", TokenVerifyView.as_view(), name="token_verify"),

    path("/register", SignupAPI.as_view()),
    path("/login", LoginAPI.as_view()),
    path("/logout", LogoutAPI.as_view()),
    path("/refresh", TokenRefreshAPI.as_view(), name="token_refresh"),
]
