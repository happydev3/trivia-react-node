
"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token
# from core.views import obtain_jwt_token
from courses import views as courses_views
from exams import views as exams_views
from blog import views as blog_views
from userprofile import views as userprofile_views
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

# class FacebookLogin(SocialLoginView):
#     adapter_class = FacebookOAuth2Adapter
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
router = routers.DefaultRouter()

router.register(r'courses', courses_views.TopicView, 'courses')
router.register(r'users', courses_views.UserView, 'users')
router.register(r'answers', exams_views.AnswerView, 'answers')
router.register(r'userscores', exams_views.UserScoreView, 'userscores')
router.register(r'blog', blog_views.PostView, 'blog')
router.register(r'category', blog_views.CategoryView, 'category')
router.register(r'tradeidea', blog_views.TradeIdeaView, 'tradeidea')
router.register(r'userprofile', userprofile_views.ProfileView, 'userprofile')
# router.register(r'scores', exams_views.ScoreView, 'scores')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    
    # path('api-auth/', include('rest_framework.urls')),
    # path('token-auth/', obtain_jwt_token)

    # path('core/', include('core.urls'))
]