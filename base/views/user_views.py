from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response   
from base.models import Product, CustomUser
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v

        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(req):
    data = req.data
    errs = []
    name = ''
    email = ''
    password = ''
    confirmPassword = ''
    if not data['name']:
        errs.append("No first name specified.")
    else:
        name = data['name'].lower()
    if not data['email']:
        errs.append("No email specified.")
    else:
        email = data['email'].lower()
        try:
            user = CustomUser.objects.filter(email=email).exists()
        except CustomUser.DoesNotExist:
            user = None     
        if user:
            return Response({"errs":["This email is already in use."]},status=status.HTTP_400_BAD_REQUEST)  
    if not data['password']:
        errs.append("Please enter a password.")
    else:
        password = data['password']
    if not data['confirmPassword']:
        errs.append("Please enter a confirmation password.")
    else:
        confirmPassword = data['confirmPassword']

    if password and confirmPassword:
        if data['password'] != data['confirmPassword']:
            errs.append("Passwords do not match.")
        if len(data['password']) < 8 and password !='test':
            errs.append("Passwords must be longer than 8 characters.")
    if len(errs) > 0:
        print(errs)
        return Response({'errs':errs},status=status.HTTP_400_BAD_REQUEST)
    else:
        user = CustomUser.objects.create(
            first_name=name,
            username=email,
            email = email,
            password = make_password(password)
        )
        serializer = UserSerializerWithToken(user,many=False)
        return Response(serializer.data)
    # except:
    #     errs = ['An error occured while signing up.']
    #     return Response(errs,status=400)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(req):
    user = req.user
    serializer = UserSerializerWithToken(user,many=False)

    data = req.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if (data['password']):
        user.password = make_password(data['password'])
    
    user.save()

    return Response(serializer.data)
   
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(req):
    user = req.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(req):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(req,pk):
    user = req.user
    userToDelete = CustomUser.objects.get(id=pk)
    if userToDelete.is_staff:
        return Response("Cannot delete.")
    else:
        userToDelete.delete()
        return Response("User was deleted.")
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUser(req,pk):
    user = CustomUser.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(req,pk):
    user = CustomUser.objects.get(id=pk)
    

    data = req.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    
    user.save()
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)