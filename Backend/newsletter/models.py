# models.py
from django.db import models

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

class Newsletter(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    content = models.TextField(blank=True, null=True) 
    image = models.ImageField(upload_to='newsletter/', blank=True, null=True)
    author = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title