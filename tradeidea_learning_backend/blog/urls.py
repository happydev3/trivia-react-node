from django.urls import path
from .views import CategoryView, PostView, TradeIdeaView

urlpatterns = [
    path('category/', CategoryView),
    path('blog/', PostView),
    path('tradeidea/', TradeIdeaView)
]