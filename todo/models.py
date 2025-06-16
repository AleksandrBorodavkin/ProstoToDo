from django.conf import settings
from django.db import models

class Task(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,  # Ссылка на модель из account
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title