from django.contrib import admin
from .models import Listing, Amenity, ListingImage

admin.site.register(Listing)
admin.site.register(Amenity)
admin.site.register(ListingImage)
