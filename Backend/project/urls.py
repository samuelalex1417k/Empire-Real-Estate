from django.contrib import admin
from django.urls import path, include  
from adminpanel.views import api_login  
from django.conf import settings
from django.conf.urls.static import static 
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from users.views import register_view
from users.views import MyTokenObtainPairView

urlpatterns = [
    path('admin/', admin.site.urls),
     path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/login/', api_login, name='api-login'),
    path('api/adminpanel/', include('adminpanel.urls')),
    path('api/listing/', include('listing.urls')),
    path('api/blogs/', include('blog.urls')),
    path('api/register/', register_view, name='register'),
    path('api/users/', include('users.urls')),
    path('api/newsletters/', include('newsletter.urls')),
    path('api/', include('contact.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
