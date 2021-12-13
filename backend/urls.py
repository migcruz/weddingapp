"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
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
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from rest_framework import routers
from todo import views as todoViews
from guestlist import views as guestlistViews

guest_detail = guestlistViews.GuestlistView.as_view({'get':'retrieve'})

router = routers.DefaultRouter()
router.register(r'todos', todoViews.TodoView, 'todo')
router.register(r'guestlist', guestlistViews.GuestlistView, 'guestlist')

urlpatterns = [
    path('admin/', admin.site.urls),         
    path('api/', include(router.urls)),
    path('api/guestlist/<token>/', guest_detail, name='guest-detail'),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]