from django.urls import path
from .views import PostDetails, PostList, index, PostCreate, PostUpdate

urlpatterns = [
    path('react', index),
    path('', PostList.as_view(), name="post_list"),
    path('create', PostCreate.as_view(), name="post_create"),
    path('<slug:pk>', PostDetails.as_view(), name="post_details"),
    path('<slug:pk>/update', PostUpdate.as_view(), name="post_update")
]