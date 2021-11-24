from django.contrib.auth.views import LogoutView, LoginView
from django.db.models import signals

from django.views.generic import CreateView
from rest_framework import viewsets, mixins
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from .send_mail import send_mail

class Logout(LogoutView):
  next_page = '/post'

class Login(LoginView):
  context_object_name = 'form'
  template_name = 'app/login.html'

  def get_redirect_url(self):
    return '/post'

class Registration(CreateView):
  context_object_name = 'form'
  template_name = 'app/registration.html'
  success_url = '/post'
  model = User
  fields = ['username', 'password', 'email']

  def get_context_data(self) :
      context = super().get_context_data()

      print(context['form'])
      if context['form'].is_valid():
        user = User.objects.create(context['form']['username'], context['form']['password'])
        user.save()
      else: 
        return super().get_context_data()

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UserSerializer
  queryset = User.objects.all()

  def perform_create(self, serializer):
      user = User.objects.create_user(**serializer.validated_data)
      user.set_password(serializer.validated_data['password'])
      return user

class CurrentUser(APIView):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
        
def post_user_save(signal, **kwargs):
  print(kwargs['instance'])
  send_mail(kwargs['instance'].email, kwargs['instance'].username)

signals.post_save.connect(post_user_save, sender=User)