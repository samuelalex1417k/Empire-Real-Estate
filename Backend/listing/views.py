from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ListingListCreateView(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-created_at') 
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]  

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class ListingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
