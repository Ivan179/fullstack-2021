"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from .view import Logout, Login, Registration
from posts.views import PostListView, MyPostListView
from comments.views import CommentListView
import debug_toolbar

router = routers.DefaultRouter()
router.register('posts', PostListView)
router.register('comments', CommentListView)
router.register('myposts', MyPostListView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('post/', include('posts.urls'), name="post"),
    path('logout/', Logout.as_view(), name='logout'),
    path('login/', Login.as_view(), name='login'),
    path('api/', include(router.urls)),
    path('registration/', Registration.as_view(), name="registration"),
    path('__debug__/', include(debug_toolbar.urls)),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
