from rest_framework import serializers
from .models import Listing, ListingImage, Amenity

class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['id', 'image']

class AmenitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Amenity
        fields = ['id', 'name']

class ListingSerializer(serializers.ModelSerializer):
    images = ListingImageSerializer(many=True, read_only=True)
    amenities = AmenitySerializer(many=True, read_only=True)
    amenity_ids = serializers.PrimaryKeyRelatedField(
        queryset=Amenity.objects.all(), many=True, write_only=True, required=False
    )

    class Meta:
        model = Listing
        fields = '__all__'

    def create(self, validated_data):
        amenity_ids = validated_data.pop('amenity_ids', [])
        request = self.context.get('request')
        images_data = request.FILES.getlist('images') if request else []

        listing = super().create(validated_data)
        listing.amenities.set(amenity_ids)

        for image in images_data:
            ListingImage.objects.create(listing=listing, image=image)

        return listing

    def update(self, instance, validated_data):
        amenity_ids = validated_data.pop('amenity_ids', None)
        request = self.context.get('request')
        images_data = request.FILES.getlist('images') if request else []

        instance = super().update(instance, validated_data)

        if amenity_ids is not None:
            instance.amenities.set(amenity_ids)

        if images_data:
            # Optional: delete old images if you want to replace them
            # instance.images.all().delete()
            for image in images_data:
                ListingImage.objects.create(listing=instance, image=image)

        return instance
