from django.contrib import admin
from .models import Exam, Question, Answer, UserScore
# Register your models here.
# class ExamsetAdmin(admin.ModelAdmin):	
#     fieldsets = (
#         (None, {
#             'fields': ('exam',)
#         }),
#         ('Advanced options', {
#             'classes': ('collapse',),
#             'fields': ('exam_score', 'exam_attending_count', 'exam_pass_status', 'title'),
#         }),
#     )
class UserScoreAdmin(admin.ModelAdmin):
	list_display = ('username', 'exam_title', 'exam_score', 'exam_attending_count', 'exam_pass_status')
class AnswerAdmin(admin.ModelAdmin):
	list_display = ('answer_title', 'answer_true_status')
admin.site.register(Exam)
admin.site.register(Question)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(UserScore, UserScoreAdmin)
