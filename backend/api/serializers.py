from rest_framework import serializers
from .models import Product, Merchant
from authenticate.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'is_merch', 'date_joined']

class MerchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Merchant
        fields = '__all__'