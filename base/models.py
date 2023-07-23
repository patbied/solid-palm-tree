from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class CustomUser(AbstractUser):
    pass


class Product(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=500, null=True, blank=True)
    image = models.ImageField(null=True,blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=500, null=True, blank=True)
    category = models.CharField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True,blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) -> str:
        return f"ID:  {self._id} Product: {self.name}"
    

class Review(models.Model):
    product =models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    user =models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=500, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    def __str__(self):
        return f"{str(self.rating)}"
    

class Order(models.Model):
    user =models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True)
    paymentMethod = models.CharField(max_length=500, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    totalPrice =models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return f"Order {self._id}"
    
class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=500, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    image = models.CharField(max_length=500, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Order product {self._id} for order {self.order}"
    
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE,null=True, blank=True)
    address =models.CharField(max_length=500, null=True, blank=True)
    city =models.CharField(max_length=500, null=True, blank=True)
    postalCode =models.CharField(max_length=500, null=True, blank=True)
    country =models.CharField(max_length=500, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Shipping Address {self._id} for order {self.order}"
