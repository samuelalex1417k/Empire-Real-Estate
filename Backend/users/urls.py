from django.urls import path
from .views import (
    RegisterView,
    UserListView,
    MyTokenObtainPairView,
    UserProfileDetailView,
    UserProfilePictureUpdateView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    path('', UserListView.as_view(), name='user-list'),

    
    path('profile/', UserProfileDetailView.as_view(), name='user-profile'),
    path('profile/upload-picture/', UserProfilePictureUpdateView.as_view(), name='profile-upload-picture'),
]
