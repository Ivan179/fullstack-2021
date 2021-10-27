from django.contrib.auth.views import LogoutView, LoginView
from django.views.generic import CreateView
from django.contrib.auth.models import User

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

  # def post(self, request):
  #     result = super().post(request)

  #     print(result)
  #     return result

  def get_context_data(self) :
      context = super().get_context_data()

      print(context['form'])
      if context['form'].is_valid():
        user = User.objects.create(context['form']['username'], context['form']['password'])
        user.save()
      else: 
        return super().get_context_data()