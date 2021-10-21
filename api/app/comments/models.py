from django.db import models
from django.contrib.auth.models import User
from posts.models import Post

class Comment(models.Model):
  text = models.TextField()
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  post = models.ForeignKey(Post, on_delete=models.CASCADE)
  date_creation = models.DateField()

  def __str__(self):
    return self.text