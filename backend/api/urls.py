from django.urls import path
from .views import SearchProductView, UserDetailView, AddProductView, MerchDetailView

urlpatterns = [
    path('search/', SearchProductView.as_view()),
    path('user/<slug:user>', UserDetailView.as_view()),
    path('user/', UserDetailView.as_view()),
    path('merch/', MerchDetailView.as_view()),
    path('merch/add_product', AddProductView.as_view()),
    path('merch/<slug:user>', MerchDetailView.as_view()),
]