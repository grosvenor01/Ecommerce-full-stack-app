from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator 
# Create your models here.
User = get_user_model()

class client(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    phone_number = models.CharField(max_length = 13)
    address = models.CharField(max_length = 100)
    info_livraison = models.CharField(max_length=100)
    photo = models.CharField(max_length=1000 , blank=True , null=True)

class Product(models.Model):
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    description = models.TextField()
    title = models.CharField(max_length=100)
    price =  models.FloatField(validators=[MinValueValidator(0.0)])
    photo = models.CharField(max_length=1000)
    photo_add1=models.CharField(max_length=1000 , blank=True , null=True)
    photo_add2=models.CharField(max_length=1000 , blank=True , null=True)
    photo_add3=models.CharField(max_length=1000 , blank=True , null=True)
    photo_add4=models.CharField(max_length=1000 , blank=True , null=True)
    rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
    price_stripe = models.CharField(max_length=200,null=True, blank=True)

class wishlist(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    products = models.ManyToManyField(Product , null =True)

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

class CartProduct(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_cart_total()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.update_cart_total()

    def update_cart_total(self, cart=None):
        if cart is None:
            cart = self.cart
        total = sum(item.product.price * item.quantity for item in CartProduct.objects.filter(cart=cart))
        cart.total_price = total
        cart.save()



class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    state = models.CharField(max_length=20,choices=(("pending","pending"),("shipping","shipping"),("complete","complete")), default="pending")

class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class Review(models.Model):
    user = models.ForeignKey(User , on_delete =models.CASCADE)
    product_signified = models.ForeignKey(Product , on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateField()
    rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
