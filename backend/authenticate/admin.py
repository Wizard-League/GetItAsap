from django.contrib import admin
from django.forms import ModelForm
from .models import User

class CustomUserForm(ModelForm):

    class Meta:
        model = User
        fields = ('username',)

admin.site.register(User, admin.ModelAdmin)