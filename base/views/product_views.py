from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response   
from base.models import Product, Review
from base.serializers import ProductSerializer
from rest_framework import status


@api_view(['GET'])
def getProducts(req):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)



@api_view(['GET'])
def getProduct(req, pk):
    try:
        product = Product.objects.get(_id=pk)
        serializer = ProductSerializer(product,many=False)
        return Response(serializer.data)
    except:
        message = {'error':'An error occured fetching this product.'}
        return Response(message,status=404)

@api_view(['POST'])
@permission_classes([IsAdminUser])
@parser_classes([MultiPartParser])
def createProduct(req):
    try:
        data = req.data
        user = req.user
        image = req.FILES.get('image')
        # print(F'DATA: {data}')
        # print(f'image: {image}')
        product = Product.objects.all()
        product = Product.objects.create(
            user=user,
            name=data['name'],
            price=data['price'],
            brand=data['brand'],
            category=data['category'],
            description=data["description"],
            countInStock=data['countInStock'],
            image = image
        )
        product.save()
        serializer = ProductSerializer(product,many=False)
        return Response(serializer.data)
        return Response("ok")
    except:
        message = {'error':'An error occured creating this product.'}
        return Response(message,status=404)    

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(req, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()
        return Response("Product deleted.")
    except:
        message = {'error':'An error occured fetching this product.'}
        return Response(message,status=404)

@api_view(['POST'])
def uploadImage(req):
    try:
        data = req.data
        product_id = data['id']
        product = Product.objects.get(_id=product_id)
        product.image = req.FILES.get('image')
        product.save()
        return Response("Image was uploaded",status=200)
    except:
        message = {'error':'An error occured fetching this product.'}
        return Response(message,status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(req, pk):
    user = req.user
    product = Product.objects.get(_id=pk)
    data = req.data
    
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        return Response("product already reviewed.",status=status.HTTP_400_BAD_REQUEST)
    
    elif data['rating'] == 0:
        return Response({"details":"Please select a rating."},status=status.HTTP_400_BAD_REQUEST)
    
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        review.save()
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total+=i.rating

        product.rating = total / len(reviews)
        product.save()
        return Response('review added')