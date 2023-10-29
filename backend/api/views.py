from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Product, Merchant
from django.db.models import Q
from rest_framework import status
from .serializers import UserDetailSerializer, MerchDetailSerializer, ProductSerializer
from authenticate.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView, ListAPIView, GenericAPIView

class SearchProductView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_merchant_from_product(self, product):
        merchant = product.merchant_set.first()
        return merchant.user.username

    def get(self, request, *args, **kwargs):
        q = request.GET['q']
        if (q):
            query = Q(title__contains = q) | Q(description__contains = q)
            products = Product.objects.filter(query)
            serializer = ProductSerializer(products, many=True)
            data = []
            for (i, product) in enumerate(products):
                    element = serializer.data[i]
                    element.update({'merchant': self.get_merchant_from_product(product)})
                    data.append(element)

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class UserDetailView(APIView):
    # permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        if 'user' in kwargs:
            user= User.objects.get(username=kwargs['user'])
        else:
            user = User.objects.get(username=request.user)
        serializer = UserDetailSerializer(user)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MerchDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        if 'user' in kwargs:
            user= User.objects.get(username=kwargs['user'])
        else:
            user = User.objects.get(username=request.user)

        merchant = Merchant.objects.get(user = user)
        user_serializer = UserDetailSerializer(user)
        merch_serializer = MerchDetailSerializer(merchant)
        products = []
        for product_id in merch_serializer.data['products']:
            product = Product.objects.get(id = product_id)
            products.append(ProductSerializer(product).data)
        data = user_serializer.data
        data.update(merch_serializer.data)
        data['products'] = products
        return Response(data, status=status.HTTP_200_OK)



class AddProductView(CreateAPIView):
    permission_classes = (IsAuthenticated, )

    serializer_class = ProductSerializer
    # def post(self, request, *args, **kwargs):
    #     product_serializer = AddProductSerializer(data=request.data)
    #     # inventory_serializer = InventorySerializer(data=request.data)

    def perform_create(self, serializer):
        merch = Merchant.objects.get(user = self.request.user)
        product = serializer.save()
        merch.products.add(product)
