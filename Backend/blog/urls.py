
from django.urls import path
from .views import BlogListCreateView,BlogDetailView, CommentListCreateView,SubscriberCreateView

urlpatterns = [
    path('subscribe/', SubscriberCreateView.as_view(), name='subscribe'),
    path('', BlogListCreateView.as_view(), name='blog-list-create'),
    path('<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('<int:blog_id>/comments/', CommentListCreateView.as_view(), name='blog-comments'),
]


    