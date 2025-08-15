from rest_framework import serializers
from .models import Blog, Comment, Subscriber

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['id', 'email', 'subscribed_at']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'blog', 'user_name', 'content', 'created_at']
        read_only_fields = ['id', 'user', 'blog', 'created_at']

    def get_user_name(self, obj):
        return obj.user.username



