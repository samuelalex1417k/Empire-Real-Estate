from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile_picture = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Profile
        fields = ['user', 'full_name', 'phone_number', 'role', 'profile_picture']
