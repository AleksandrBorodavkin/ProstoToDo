from rest_framework import serializers
from .models import Task

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ['url', 'id', 'title', 'description', 'completed', 'created_at']
        extra_kwargs = {
            'url': {'view_name': 'todo-detail', 'lookup_field': 'pk'}
        }