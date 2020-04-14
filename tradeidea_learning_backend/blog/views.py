from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import CategorySerializer, PostSerializer, TradeIdeaSerializer  # add this
from .models import Category, Post, TradeIdea
# from django.contrib.auth.models import User 
# Create your views here.
class CategoryView(viewsets.ModelViewSet):
	serializer_class = CategorySerializer
	queryset = Category.objects.all()
class PostView(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	queryset = Post.objects.all()
class TradeIdeaView(viewsets.ModelViewSet):
	serializer_class = TradeIdeaSerializer
	queryset = TradeIdea.objects.all()