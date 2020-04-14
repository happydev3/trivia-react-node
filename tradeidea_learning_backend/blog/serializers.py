from rest_framework import serializers
from .models import Category, Post, TradeIdea

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ['category_title']
class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = '__all__'
class TradeIdeaSerializer(serializers.ModelSerializer):
	class Meta:
		model = TradeIdea
		fields = '__all__'