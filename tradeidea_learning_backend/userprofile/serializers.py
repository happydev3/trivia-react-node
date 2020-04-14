from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profile
		fields = '__all__'
	def create(self, validated_data):
		print("validated_data", validated_data)
		# course_data = validated_data.pop('course')
		# course = Course.objects.create(**course_data)
		# lesson = Lesson.objects.create(**validated_data, course=course)
		# return lesson