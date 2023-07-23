from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response   
from base.models import Product, Order, OrderItem, ShippingAddress
from rest_framework import status
from base.serializers import OrderSerializer
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(req):
    user = req.user
    data = req.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No order items'},status=status.HTTP_400_BAD_REQUEST) 
    else:
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        )
        order.save()
        shipping = ShippingAddress.objects.create(
            order = order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
        )
        shipping.save()

        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )
            product.countInStock -=int(i['qty'])
            product.save()
        serializer = OrderSerializer(order,many=False)
    return Response(serializer.data,status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserOrders(req):
    user = req.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(req,pk):
    user = req.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user== user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized'},status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(req,pk):
    user = req.user
    print(user)
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response("Order was paid",status=200)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(req,pk):
    user = req.user
    print(user)
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response("Order was delivered",status=200)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(req):
    try:
        order = Order.objects.all()
        serializer = OrderSerializer(order,many=True)
        return Response(serializer.data)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)