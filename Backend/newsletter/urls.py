from django.urls import path
from .views import SubscriberCreateView, NewsletterListcreateView, NewsletterDetailView

urlpatterns = [
    path('subscribe/', SubscriberCreateView.as_view(), name='subscribe'),
    path('', NewsletterListcreateView.as_view(), name='newsletter-list-create'),
    path('<int:pk>/', NewsletterDetailView.as_view(), name='newsletter-detail'),
]
