from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
# Create your models here.
User = get_user_model()
class client(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    phone_number = models.CharField(max_length = 13)
    address = models.CharField(max_length = 100)
    info_livraison = models.CharField(max_length=100)
    photo = models.CharField(max_length=1000 , blank=True , null=True)
class product(models.Model):
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
    products = models.ManyToManyField(product , null =True)
class cart(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    products = models.ManyToManyField(product,null=True)
    total_price = models.FloatField(validators=[MinValueValidator(0.0)])
    coupone = models.TextField() #use t to store coupoune separed by , (handel it in the API)

@receiver(m2m_changed, sender=cart.products.through)
def update_cart_price(sender, instance, action, **kwargs):
    if action in ('post_add', 'post_remove', 'post_clear'):
        instance.total_price = instance.products.aggregate(sum_price=models.Sum('price'))['sum_price'] or 0.0

m2m_changed.connect(update_cart_price, sender=cart.products.through)

class Review(models.Model):
    user = models.ForeignKey(User , on_delete =models.CASCADE)
    product_signified = models.ForeignKey(product , on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateField()
    rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
class order(models.Model):
    state = models.CharField(max_length=20,choices=(("pending","pending"),("shipping","shipping"),("complete","complete")))
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(product)
    total_price = models.FloatField(validators=[MinValueValidator(0.0)])
