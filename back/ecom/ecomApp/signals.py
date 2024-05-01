from django.db.models.signals import post_save , pre_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import *
import stripe 
from django.conf import settings
@receiver(post_save , sender=User)
def perssonel_wishlist_cart(sender , instance , created , **kwargs):
    if created:
        wishlist.objects.create(user=instance)
        Cart.objects.create(user=instance,total_price=0.0)

@receiver(pre_save , sender=Product)
def add_to_stripe(sender, instance, **kwargs):
    if instance._state.adding: 
        stripe.api_key = settings.STRIPE_SECRET_KEY
        product = stripe.Product.create(
            name=instance.title,
            description=instance.description
        )
        unit_amount = int(instance.price*100)
        price = stripe.Price.create(
            product=product.id,
            unit_amount=unit_amount,
            currency='usd',
        )
        instance.price_stripe = price.id

@receiver(post_save, sender=CartProduct)
def handle_cart_update(sender, instance, **kwargs):
    instance.update_cart_total()

@receiver(post_delete, sender=CartProduct)
def handle_cart_delete(sender, instance, **kwargs):
    # After deletion, instance.cart is not accessible, pass the cart as argument
    instance.update_cart_total(cart=instance.cart)