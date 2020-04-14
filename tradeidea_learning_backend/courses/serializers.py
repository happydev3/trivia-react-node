from rest_framework import serializers
from .models import Course, Lesson, Topic
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = '__all__'
class CourseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Course
		fields = '__all__'
class LessonSerializer(serializers.ModelSerializer):
	course = CourseSerializer()
	class Meta:
		model = Lesson
		fields = ('lesson_title', 'course')
	def create(self, validated_data):
		course_data = validated_data.pop('course')
		course = Course.objects.create(**course_data)
		lesson = Lesson.objects.create(**validated_data, course=course)
		return lesson
	def update(self, instance, validated_data):
		course_data = validated_data.pop('course')
		course = instance.course
		instance.lesson_title = validated_data.get('lesson_title', instance.lesson_title)
		instance.save()

		course.id = course_data.get(
			'id',
			course.id
		)
		course.course_title = course_data.get(
			'course_title',
			course.course_title
		)

		
		course.save()
		return instance	
class TopicSerializer(serializers.ModelSerializer):
	lesson = LessonSerializer() 
	class Meta:
		model = Topic
		fields = ('id', 'topic_title', 'topic_link', 'topic_status', 'lesson')
	def create(self, validated_data):
		lesson_data = validated_data.pop('lesson')
		lesson = Lesson.objects.create(**lesson_data)
		topic = Topic.objects.create(**validated_data, lesson=lesson)
		return topic
	def update(self, instance, validated_data):
		lesson_data = validated_data.pop('lesson')
		lesson = instance.lesson
		print("=========")
		print(lesson_data)
		instance.topic_title = validated_data.get('topic_title', instance.topic_title)
		instance.topic_link = validated_data.get('topic_link', instance.topic_link)
		instance.topic_status = validated_data.get('topic_status', instance.topic_status)
		instance.save()
		lesson.lesson_title = lesson_data.get(
			'lesson_title',
			lesson.lesson_title
		)

		
		lesson.save()
		return instance

