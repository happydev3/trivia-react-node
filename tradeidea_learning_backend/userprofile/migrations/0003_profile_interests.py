# Generated by Django 3.0.2 on 2020-02-28 14:16

from django.db import migrations
import json_field.fields


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0002_auto_20200228_2147'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='interests',
            field=json_field.fields.JSONField(default=None, help_text='Enter a valid JSON object'),
        ),
    ]