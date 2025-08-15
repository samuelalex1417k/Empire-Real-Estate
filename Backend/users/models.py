from django.db import models
from django.contrib.auth.models import User

def user_profile_picture_path(instance, filename):
    return f'profile_pics/user_{instance.user.id}/{filename}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    registered_via_api = models.BooleanField(default=True)
    profile_picture = models.ImageField(upload_to=user_profile_picture_path, blank=True, null=True)

    def __str__(self):
        return self.user.username
