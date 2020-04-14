from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User                   # add this

class ProfileView(viewsets.ModelViewSet):
	serializer_class = ProfileSerializer
	queryset = Profile.objects.all()