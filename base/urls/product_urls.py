from django.urls import path
from base.views import product_views as views


urlpatterns = [

    path('review/<str:pk>/',views.createProductReview,name='review'),
    path('',views.getProducts,name='products'),
    path('create/',views.createProduct,name='product-create'),
    path('upload/',views.uploadImage,name='upload-image'),
    path('delete/<str:pk>/',views.deleteProduct,name='product-delete'),
    path('<str:pk>/',views.getProduct,name='product'),
    
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
