from django.urls import path
from .views import AnswerView, UserScoreView

urlpatterns = [
    path('answers/', AnswerView),
    path('userscores/', UserScoreView)
    # path('scores/', ScoreView)
]