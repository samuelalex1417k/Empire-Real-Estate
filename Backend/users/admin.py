from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'registered_via_api')
    search_fields = ('user__username',)
    list_filter = ('registered_via_api',)
