from django.db import models

class Amenity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Listing(models.Model):
    address = models.CharField(max_length=255)       
    price = models.DecimalField(max_digits=12, decimal_places=2)  
    label = models.CharField(max_length=50, blank=True, null=True)  
    size=models.IntegerField(default=0)
    type=models.CharField(max_length=25,  blank=True, null=True)
    beds = models.IntegerField(default=0)             
    baths = models.IntegerField(default=0) 
    garage = models.IntegerField(default=0) 
    description =models.CharField(blank=True, null=True)         
    image = models.ImageField(upload_to='listings/', blank=True, null=True)
    amenities = models.ManyToManyField(Amenity, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.address
    
class ListingImage(models.Model):
    listing = models.ForeignKey(Listing, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='listings/extra_images/')

    def __str__(self):
        return f"Image for {self.listing.address}"