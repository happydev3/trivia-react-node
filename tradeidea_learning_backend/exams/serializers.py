from rest_framework import serializers
from .models import Exam, Question, Answer, UserScore
from django.contrib.auth.models import User

class ExamSerializer(serializers.ModelSerializer):
	class Meta:
		model = Exam
		fields = '__all__'
class QuestionSerializer(serializers.ModelSerializer):
	exam = ExamSerializer()
	class Meta:
		model = Question
		fields = ('question_title', 'exam')
class AnswerSerializer(serializers.ModelSerializer):
	question = QuestionSerializer()
	class Meta:
		model = Answer
		fields = ('answer_title', 'answer_true_status', 'question')
class UserScoreSerializer(serializers.ModelSerializer):
	class Meta:
		model= UserScore
		fields = '__all__'
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('username', 'email')
# class ExamsetSerializer(serializers.ModelSerializer):
# 	# exam = ExamSerializer()
# 	class Meta:
# 		model = Examset
# 		fields = ('exam_score', 'exam_attending_count', 'exam_attending_count', 'exam_pass_status', 'title')
	# def create(self, validated_data):
	# 	exam_data = validated_data.pop('exam')
	# 	exam = Exam.objects.create(**exam_data)
	# 	examset = Examset.objects.create(**validated_data, exam=exam)
	# 	return examset
	# def update(self, instance, validated_data):
	# 	print("validated_data", validated_data)
		# exam_data = validated_data.pop('exam')
		# exam = instance.exam

		# instance.save()

		# exam.exam_title = exam_data.get(
		# 	'exam_title',
		# 	exam.exam_title
		# )
		# exam.save()
		# return instance
# class ScoreSerializer(serializers.ModelSerializer):
# 	user = UserSerializer()
# 	exam_manager = ExamsetSerializer()
# 	class Meta:
# 		model = Score
# 		fields = '__all__'
# 	def update(self, instance, validated_data):
# 		print("validated_data", validated_data)
# 		print("instance", instance)
# 		user = validated_data.pop('user')
# 		exam_manager_data = validated_data.pop('exam_manager')
# 		exam_manager = instance.exam_manager
# 		# print("=========")
# 		# print(exam_manager_data)
# 		instance.save()
# 		exam_manager.exam_score = exam_manager_data.get(
# 			'exam_score',
# 			exam_manager.exam_score
# 		)
# 		exam_manager.exam_attending_count = exam_manager_data.get(
# 			'exam_attending_count',
# 			exam_manager.exam_attending_count
# 		)
# 		exam_manager.exam_pass_status = exam_manager_data.get(
# 			'exam_pass_status',
# 			exam_manager.exam_pass_status
# 		)
# 		exam_manager.save()
# 		return instance