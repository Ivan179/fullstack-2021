import datetime
from rest_framework import viewsets, mixins
from .models import Comment
from .serializers import CommentSerializer

class CommentListView(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
  queryset = Comment.objects.all()
  serializer_class = CommentSerializer

  def perform_create(self, serializer):
      serializer.validated_data['user'] = self.request.user
      serializer.validated_data['date_creation'] = datetime.date.today()
      return super().perform_create(serializer)