from django.contrib import admin
from .models import Course, Lesson, Topic

class TopicAdmin(admin.ModelAdmin):
    fields = ['topic_title', 'topic_link', 'lesson']

class LessonAdmin(admin.ModelAdmin):
	fields = ['lesson_title', 'course']
admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Topic, TopicAdmin)


