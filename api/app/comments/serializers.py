from rest_framework import serializers
from posts.serializers import PostSerializer
from app.serializers import UserSerializer
from .models import Comment

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = ['id', 'text', 'date_creation', 'user', 'post']
    read_only_fields = ('date_creation', 'user')