from django.shortcuts import render
from .models import Post
from django.views.generic import ListView, DetailView

def index(request):
  return render(request, 'posts/react.html')

class PostList(ListView):
  template_name = 'posts/postList.html'
  model = Post
  context_object_name = 'posts'


class PostDetails(DetailView):
  template_name = 'posts/postDetails.html'
  model = Post
  context_object_name = 'post'