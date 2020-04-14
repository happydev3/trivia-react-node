from django.contrib import admin
from .models import Category, Post, TradeIdea
from .list_filters import TradeIdeaListFilter

class PostAdmin(admin.ModelAdmin):
	list_display = ('post_subject','post_published','post_author','post_category')
admin.site.register(Post, PostAdmin)
admin.site.register(Category)
# admin.site.register(TradeIdea)
@admin.register(TradeIdea)
class TradeIdeaAdmin(admin.ModelAdmin):
    list_display = ('trade_subject', 'trade_status_flag', 'trade_score',)
    list_filter = (TradeIdeaListFilter, )

