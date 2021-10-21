from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
  title = models.CharField(max_length=100)
  description = models.TextField()
  topic = models.CharField(max_length=100)
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  image = models.ImageField(upload_to="post_images")

  def __str__(self):
    return '{} {}'.format(self.title, self.description)