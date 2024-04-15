from rest_framework import serializers
from .models import *

class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}} # the field will only be used for deserialization (when creating or updating an object
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = client
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = '__all__'

class WishlistSerializer1(serializers.ModelSerializer):
    class Meta:
        model = wishlist
        fields = '__all__'
class WishlistSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = wishlist
        fields = '__all__'

class CartSerializer1(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = '__all__'
class CartSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = cart
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class OrderSerializer1(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True,read_only=True)

    class Meta:
        model = order
        fields = '__all__'