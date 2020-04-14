from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
# Create your models here.
class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)
    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value':self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)
class Exam(models.Model):
    exam_title = models.CharField(max_length=300)
    exam_limit_count = models.IntegerField()
    exam_limit_time = models.IntegerField()
    exam_pass_grade = IntegerRangeField(min_value=0, max_value=10)
    def __str__(self):
        return self.exam_title
class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question_title = models.CharField(max_length=300)
    def __str__(self):
        return self.question_title
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_title = models.CharField(max_length=300)
    answer_true_status = models.BooleanField()
    def __str__(self):
        return self.answer_title
class UserScore(models.Model):
    user_id = models.IntegerField()
    username = models.CharField(max_length=300)
    exam_title = models.CharField(max_length=300)
    exam_score = models.FloatField()
    exam_attending_count = models.IntegerField()
    exam_pass_status = models.BooleanField()
    def __str__(self):
        return self.exam_title

# class Examset(models.Model):
#     exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
#     exam_score = models.FloatField(blank=True, null=True, default=None)
#     exam_attending_count = models.IntegerField(blank=True, null=True)
#     exam_pass_status = models.BooleanField()
#     title = models.CharField(max_length=300, blank=True, null=True)
#     def save(self, *args, **kwargs):
#         self.title = self.exam.exam_title
#         super(Examset, self).save(*args, **kwargs)
#     def __str__(self):
#         return self.title



		