from rest_framework import serializers
from posts.serializers import PostSerializer
from app.serializers import UserSerializer
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  post = PostSerializer()
  class Meta:
    model = Comment
    fields = ['id', 'text', 'date_creation', 'user', 'post']