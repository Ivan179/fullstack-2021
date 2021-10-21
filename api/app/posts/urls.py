from django.urls import path
from .views import PostDetails, PostList, index

urlpatterns = [
    path('react', index),
    path('', PostList.as_view(), name="post_list"),
    path('<slug:pk>', PostDetails.as_view(), name="post_details")
]