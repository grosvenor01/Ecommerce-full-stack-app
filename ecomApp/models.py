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
    photo = models.ImageField(upload_to="./profile_pic/" , blank=True , null = True)
class product(models.Model):
    quantity = models.IntegerField(validators=[MinValueValidator(0)])
    description = models.TextField()
    title = models.CharField(max_length=100)
    price =  models.FloatField(validators=[MinValueValidator(0.0)])
    photo = models.ImageField(upload_to="./product_pic/",blank=True , null = True)
    photo_add1=models.ImageField(upload_to="./product_pic/",blank=True , null = True)
    photo_add2=models.ImageField(upload_to="./product_pic/",blank=True , null = True)
    photo_add3=models.ImageField(upload_to="./product_pic/",blank=True , null = True)
    photo_add4=models.ImageField(upload_to="./product_pic/",blank=True , null = True)
    state = models.CharField(max_length=20,choices=(("pending","pending"),("shipping","shipping"),("complete","complete")))
    rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
class wishlist(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    products = models.ManyToManyField(product)
class cart(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE)
    products = models.ForeignKey(product,on_delete = models.CASCADE)
    total_price = models.FloatField(validators=[MinValueValidator(0.0)])
    coupone = models.TextField() #use t to store coupoune separed by , (handel it in the API)
class Review(models.Model):
    user = models.ForeignKey(User , on_delete =models.CASCADE)
    product_signified = models.ForeignKey(product , on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateField()
    rating = models.FloatField(validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
class order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(product)
    total_price = models.FloatField(validators=[MinValueValidator(0.0)])
