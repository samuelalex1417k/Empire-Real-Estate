from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import api_login, api_profile, AdminTokenObtainPairView

urlpatterns = [
     path('login/', api_login, name='admin-login'),
     path('profile/', api_profile, name='admin-profile'), 
     path('token/', AdminTokenObtainPairView.as_view(), name='token_obtain_pair'),
     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), 
]
