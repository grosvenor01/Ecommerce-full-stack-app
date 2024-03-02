from rest_framework import generics ,permissions
from .models import client, product, wishlist, cart, Review, order
from .serializer import *
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login

class register(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        response = Response({
        "user": user_serializer(user, context=self.get_serializer_context()).data,
        })
        return response

class logine(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        response = super(logine, self).post(request, format=None)
        response.set_cookie("id",user.id,path="/",max_age=3600*24*365)
        response.set_cookie("username",user.username,path="/",max_age=3600*24*365)
        response.set_cookie("login_token",response.data["token"],path="/",max_age=3600*24*365)
        return response

class ClientListCreateView(generics.ListCreateAPIView):
    queryset = client.objects.all()
    serializer_class = ClientSerializer
    def post(self , request):
        serializer = ClientSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = 201)
        return Response(serializer.errors , status = 400)

class ClientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = client.objects.all()
    serializer_class = ClientSerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = product.objects.all()
    serializer_class = ProductSerializer

class WishlistListCreateView(generics.ListCreateAPIView):
    queryset = wishlist.objects.all()
    serializer_class = WishlistSerializer1

class WishlistDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = wishlist.objects.all()
    serializer_class = WishlistSerializer

class CartListCreateView(generics.ListCreateAPIView):
    queryset = cart.objects.all()
    serializer_class = CartSerializer

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = cart.objects.all()
    serializer_class = CartSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = order.objects.all()
    serializer_class = OrderSerializer1

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = order.objects.all()
    serializer_class = OrderSerializer