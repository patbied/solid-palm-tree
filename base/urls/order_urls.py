from django.urls import path
from base.views import order_views as  views


urlpatterns = [
    path('',views.getOrders,name='get-orders'),
    path('add/',views.addOrderItems,name='add-order'),
    path('myorders/',views.getUserOrders,name='my-orders'),
    path('<str:pk>/',views.getOrderById,name='get-order-by-id'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='pay-for-order'),
    path('deliver/<str:pk>',views.updateOrderToDelivered,name='delivered-order'),
]
