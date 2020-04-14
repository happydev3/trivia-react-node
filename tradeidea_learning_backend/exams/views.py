
from django.shortcuts import render
from rest_framework import viewsets          # add this
from .serializers import ExamSerializer, QuestionSerializer, AnswerSerializer, UserScoreSerializer, UserSerializer   # add this
from .models import Exam, Question, Answer, UserScore
from django.contrib.auth.models import User                   # add this

class UserView(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()
class ExamView(viewsets.ModelViewSet):
	serializer_class = ExamSerializer
	queryset = Exam.objects.all()
class QuestionView(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer
	queryset = Question.objects.all()
class AnswerView(viewsets.ModelViewSet):
	serializer_class = AnswerSerializer
	queryset = Answer.objects.all()
class UserScoreView(viewsets.ModelViewSet):
	serializer_class = UserScoreSerializer
	queryset = UserScore.objects.all()
# class ExamsetView(viewsets.ModelViewSet):
# 	serializer_class = ExamsetSerializer
# 	queryset = Examset.objects.all()
# class ScoreView(viewsets.ModelViewSet):
# 	serializer_class = ScoreSerializer
# 	queryset = Score.objects.all()