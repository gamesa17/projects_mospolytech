from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

apiV1Prefix = "api/v1"

urlpatterns = [
    path("admin/", admin.site.urls),
    path(f"{apiV1Prefix}/auth", include("authtokens.urls")),
    path(f"{apiV1Prefix}/courses", include("courses.urls")),
    path(f"{apiV1Prefix}/homeworks", include("homeworks.urls")),
    path(f"{apiV1Prefix}/languages", include("languages.urls")),
    path(f"{apiV1Prefix}/levels", include("levels.urls")),
    path(f"{apiV1Prefix}/permissions", include("permissions.urls")),
    path(f"{apiV1Prefix}/users", include("users.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
