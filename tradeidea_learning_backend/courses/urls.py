from django.urls import path
from .views import TopicView, UserView

urlpatterns = [
    path('courses/', TopicView),
    path('users/', UserView)
]