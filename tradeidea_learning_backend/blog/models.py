from django.db import models

# Create your models here.
class Category(models.Model):
	category_title = models.CharField(max_length=300)
	def __str__(self):
		return self.category_title
class Post(models.Model):
	post_subject = models.CharField(max_length=300)
	post_content = models.TextField()
	post_published = models.DateTimeField(auto_now_add=True)
	post_author = models.CharField(max_length=300)
	post_category = models.CharField(max_length=300)
	def __str__(self):
		return self.post_subject
class TradeIdea(models.Model):
	trade_subject = models.CharField(max_length=300)
	trade_category = models.CharField(max_length=300)
	trade_author = models.CharField(max_length=300)
	trade_published = models.DateTimeField(auto_now_add=True)
	trade_content = models.TextField()
	trade_status_flag = models.CharField(max_length=300)
	trade_score = models.IntegerField(blank=True, null=True)
	admin_approval = models.BooleanField(default=False)
	def __str__(self):
		return self.trade_status_flag
	def save(self, *args, **kwargs):
		if self.admin_approval is True:
			self.trade_score = 10
		super(TradeIdea, self).save(*args, **kwargs)
