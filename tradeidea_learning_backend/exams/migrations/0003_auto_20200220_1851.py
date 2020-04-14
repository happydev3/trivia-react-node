# Generated by Django 3.0.2 on 2020-02-20 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0002_auto_20200220_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examset',
            name='exam_attending_count',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='examset',
            name='exam_score',
            field=models.FloatField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='examset',
            name='title',
            field=models.CharField(blank=True, max_length=300, null=True),
        ),
    ]