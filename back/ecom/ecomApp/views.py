from rest_framework import generics ,permissions
from .models import client, product, wishlist, cart, Review, order
from .serializer import *
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from django.http import JsonResponse , HttpResponse
from django.db.models import Q
import stripe  
from django.shortcuts import redirect
from django.conf import settings
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
        response.set_cookie("id",user.id,path="/",max_age=3600*24*365,samesite='Lax')
        response.set_cookie("username",user.username,path="/",max_age=3600*24*365,samesite='Lax')
        response.set_cookie("login_token",response.data["token"],path="/",max_age=3600*24*365,samesite='Lax')
        response.data['id'] = user.id
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
    serializer_class = WishlistSerializer
    def get_queryset(self):
        user_id = self.kwargs['pk'] 
        return Wishlist.objects.filter(user__id=user_id)
        
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
    def get(self , request , pk ):
        review =  Review.objects.filter(product_signified=pk)
        serialized_review = ReviewSerializer(review, many=True)
        return Response(serialized_review.data, status=200)

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = order.objects.all()
    serializer_class = OrderSerializer1

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = order.objects.all()
    serializer_class = OrderSerializer

class payment(APIView):
    pass
class search(APIView):
    def get(self, request):
        text = request.data["Text"]
        
        #Q objects to combine filters
        title_filter = Q(title__contains=text)
        description_filter = Q(description__contains=text)
        filters = product.objects.filter(title_filter | description_filter)
        if request.data.get("max_price"):
            filters = filters.filter(price__lte=request.data["max_price"])
        
        # Serializing the queryset
        serialized_data = ProductSerializer(filters, many=True).data
        
        return JsonResponse(serialized_data, status=200 , safe=False)
class StripCheckoutView(APIView): 
    stripe.api_key = settings.STRIPE_SECRET_KEY
    def post(self,request):
        localhost_url = 'http://localhost:8000'
        try:
            line_items = []
            for item in request.data:
                product_id = item.get('id')
                quantity = item.get('quantity')
                line_item = {
                    'quantity': quantity,
                    'price': product.objects.get(id=product_id).price_stripe,
                }
                line_items.append(line_item)
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                mode="payment",
                payment_method_types =['card',],
                success_url= f'{localhost_url}/admin',
                cancel_url=f'{localhost_url}/admin',
            )
        except Exception as e:
            return Response({"error":"Product doesn't exist"+str(e)} , status = 500)
        return JsonResponse({"checkout_url": checkout_session.url})
    
def success_callback(request):
    session_id = request.GET.get('session_id')
    items = request.data
    session = stripe.checkout.Session.retrieve(session_id)
    order_add = order.objects.create(user=request.user)

    # Add products to the order based on the items in the request
    for item in items:
        product_id = item.get('id')
        quantity = item.get('quantity')
        product_instance = product.objects.get(id=product_id)
        order_add.products.add(product_instance)

    order_add.total_price = sum(product.price_stripe for product in order.products.all())
    order.save()

    return HttpResponse("Success!")
                
