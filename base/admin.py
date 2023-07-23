from django.contrib import admin
from .models import *


admin.site.register(CustomUser)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(ShippingAddress)
admin.site.register(OrderItem)
admin.site.register(Review)
# Register your models here.
