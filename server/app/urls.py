from django.contrib import admin
from django.urls import path
from django.urls.conf import include

apiV1Prefix = "api/v1/"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(apiV1Prefix, include("authtokens.urls")),
    path(apiV1Prefix, include("courses.urls")),
    path(apiV1Prefix, include("homeworks.urls")),
    path(apiV1Prefix, include("languages.urls")),
    path(apiV1Prefix, include("levels.urls")),
    path(apiV1Prefix, include("permissions.urls")),
    path(apiV1Prefix, include("users.urls")),
]
