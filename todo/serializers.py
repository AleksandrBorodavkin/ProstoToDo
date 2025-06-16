from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['url', 'id', 'title', 'description', 'completed', 'created_at']
        extra_kwargs = {
            'url': {'view_name': 'todo-detail', 'lookup_field': 'pk'}
        }