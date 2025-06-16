from rest_framework import viewsets
from .models import Task
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TodoSerializer