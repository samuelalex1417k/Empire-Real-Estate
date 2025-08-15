from rest_framework import generics, status
from .models import Blog, Comment,Subscriber
from .serializers import BlogSerializer, CommentSerializer, SubscriberSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

class SubscriberCreateView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

class BlogListCreateView(generics.ListCreateAPIView):
    queryset = Blog.objects.all().order_by('-created_at')
    serializer_class = BlogSerializer

class BlogDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]



class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        blog_id = self.kwargs['blog_id']
        return Comment.objects.filter(blog_id=blog_id).order_by('-created_at')

    def perform_create(self, serializer):
        blog_id = self.kwargs['blog_id']
        serializer.save(user=self.request.user, blog=self.get_blog())
