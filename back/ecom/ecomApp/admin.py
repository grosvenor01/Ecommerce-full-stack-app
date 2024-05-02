from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Product)
admin.site.register(client)
admin.site.register(Review)
admin.site.register(wishlist)
admin.site.register(Order)
admin.site.register(Cart)
