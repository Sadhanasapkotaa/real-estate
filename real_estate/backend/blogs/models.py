from django.db import models

# Create your models here.

class Blog(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    authr_designation = models.CharField(max_length=100)
    
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
