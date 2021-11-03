from rest_framework import serializers
from .models import Post
from comments.models import Comment
from app.serializers import UserSerializer

class CommentSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Comment
    fields = ['id', 'text', 'date_creation', 'user']

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  comment_set = CommentSerializer(many=True, read_only=True)

  class Meta:
    model = Post
    fields = ['id', 'title', 'description', 'topic', 'image', 'user', 'comment_set']