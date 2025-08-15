from rest_framework import generics
from .models import Subscriber, Newsletter  
from .serializers import SubscriberSerializer, NewsletterSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class SubscriberCreateView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

class NewsletterListcreateView(generics.ListCreateAPIView):
    queryset = Newsletter.objects.all().order_by('-created_at')
    serializer_class = NewsletterSerializer

class NewsletterDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]