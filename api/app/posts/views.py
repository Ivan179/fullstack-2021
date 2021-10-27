from django.http.response import HttpResponseNotFound, HttpResponseRedirect
from django.shortcuts import render
from django import forms
from .models import Post
from django.urls import reverse
from django.views.generic import ListView, DetailView, CreateView, UpdateView

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

class PostCreateForm(forms.Form):
  title = forms.CharField(label="Название")
  description = forms.CharField(label="Описание")
  topic = forms.CharField(label="Тема")
  image = forms.ImageField()

def product_create(request):
  if request.method == 'POST':
    form = PostCreateForm(request.POST, request.FILES)
    if form.is_valid():
      title = form.cleaned_data.get('title')
      description = form.cleaned_data.get('description')
      topic = form.cleaned_data.get('topic')
      image = form.cleaned_data.get('image')
      post = Post.objects.create(title=title, description=description, topic=topic, image=image, user=request.user)
      post.save()

      return HttpResponseRedirect('/post')
  else:
    form = PostCreateForm()
  return render(request, 'posts/postCreate.html', { 'form': form })

class PostCreate(CreateView):
  template_name = 'posts/postCreate.html'
  model = Post
  context_object_name = 'form'
  fields = ['title', 'description', 'topic', 'image']

  def form_valid(self, form):
    form.instance.user = self.request.user
    return super(PostCreate, self).form_valid(form)
    
  def get_success_url(self):
    return reverse('post_details', args=(self.object.id,))

class PostUpdate(UpdateView):
  template_name = 'posts/postUpdate.html'
  model = Post
  context_object_name = 'form'
  fields = ['title', 'description', 'topic', 'image']

  def dispatch(self, request, pk):
    post = Post.objects.get(id=pk)
    if post.user == request.user:
      return super().dispatch(request)
    return HttpResponseNotFound()
    
  def get_success_url(self):
    return reverse('post_details', args=(self.object.id,))