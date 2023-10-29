from django.db import models
from authenticate.models import User




class Product(models.Model):
    title = models.CharField(max_length=256)
    # image = models.ImageField()
    price = models.FloatField()
    description = models.CharField(max_length=512)
    quantity = models.PositiveIntegerField(default=0)


class Merchant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_open = models.BooleanField(default=True)
    pin_code = models.IntegerField()
    address = models.CharField(max_length=256)
    products = models.ManyToManyField(Product, blank=True)