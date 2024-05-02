from rest_framework import generics ,permissions
from .models import client, Product, wishlist, Cart, Review, Order
from .serializer import *
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from rest_framework.views import APIView
from django.http import JsonResponse , HttpResponse
from django.db.models import Q
import stripe  
from knox.auth import TokenAuthentication
from django.shortcuts import redirect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db import transaction

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
class userview(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = user_serializer
    def get(self , request , pk):
        user_id = self.kwargs['pk']
        query = User.objects.filter(id=user_id)
        serializer = user_serializer(query,many=True)
        return Response(serializer.data,status = 200)

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
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class WishlistListCreateView(generics.ListCreateAPIView):
    queryset = wishlist.objects.all()
    serializer_class = WishlistSerializer1

class WishlistDetailView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    serializer_class = WishlistSerializer

    def get_queryset(self):
        return wishlist.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=200)

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({'error': 'product_id is required'}, status=400)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Invalid product_id'}, status=404)

        wl, _ = wishlist.objects.get_or_create(user=request.user)
        wl.products.add(product)
        serializer = self.serializer_class(wl)
        return Response(serializer.data, status=200)

    def delete(self, request, *args, **kwargs):
        product_id = request.query_params.get('product_id')
        if not product_id:
            return Response({'error': 'product_id is required'}, status=400)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Invalid product_id'}, status=404)

        wishlist = self.get_queryset().first()
        if not wishlist:
            return Response({'error': 'Wishlist not found'}, status=404)

        wishlist.products.remove(product)
        serializer = self.serializer_class(wishlist)
        return Response(serializer.data, status=200)

class ProductWishlistCheckView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Invalid product_id'}, status=404)

        wl = wishlist.objects.filter(user=request.user, products=product).exists()
        print("Product in Wishlist:", wl)
        return Response({'is_in_wishlist': wl}, status=200)

class CartListCreateView(generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        # Ensures that a user can only access their own cart
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        return cart

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
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return orders for the currently authenticated user
        return Order.objects.filter(user=self.request.user, total_price__gt=0)

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class CartProductCreateView(generics.CreateAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        product_id = self.request.data.get('product_id')
        quantity = self.request.data.get('quantity')
        product = Product.objects.get(id=product_id)

        if product.quantity < quantity:
            raise serializers.ValidationError("Insufficient stock available")
        
        existing_item = CartProduct.objects.filter(cart__user=self.request.user, product_id=product_id).first()
        if existing_item:
            existing_item.quantity += 1
            existing_item.save()
        else:
            cart, _ = Cart.objects.get_or_create(user=self.request.user)
            serializer.save(cart=cart, product=product, quantity=quantity)

class CartProductUpdateView(generics.UpdateAPIView): #/api/cart-items/{cart_item_id}/
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def perform_update(self, serializer):
        cart_product = serializer.instance  # This gets the specific CartProduct based on the <int:pk> in the URL
        new_quantity = serializer.validated_data['quantity']
        print(new_quantity, cart_product.product.quantity)
        if new_quantity > cart_product.product.quantity:
            raise serializers.ValidationError({
                "quantity": "Insufficient stock available. Only {} units of '{}' are available.".format(cart_product.product.quantity, cart_product.product.title)
            })

        # Assuming you only update quantity and no other fields for CartProduct
        cart_product.quantity = new_quantity
        cart_product.save()

class CartProductDeleteView(generics.DestroyAPIView):
    queryset = CartProduct.objects.all()
    serializer_class = CartProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

class payment(APIView):
    pass
class search(APIView):
    def post(self, request):
        text = request.data["Text"]
        
        #Q objects to combine filters
        title_filter = Q(title__contains=text)
        description_filter = Q(description__contains=text)
        filters = Product.objects.filter(title_filter | description_filter)
        if request.data.get("max_price"):
            filters = filters.filter(price__lte=request.data["max_price"])
        
        # Serializing the queryset
        serialized_data = ProductSerializer(filters, many=True).data
        
        return JsonResponse(serialized_data, status=200 , safe=False)
    
# class StripCheckoutView(APIView): 
#     stripe.api_key = settings.STRIPE_SECRET_KEY
#     def post(self,request):
#         localhost_url = 'http://localhost:8000'
#         try:
#             line_items = []
#             for item in request.data:
#                 product_id = item.get('id')
#                 quantity = item.get('quantity')
#                 line_item = {
#                     'quantity': quantity,
#                     'price': product.objects.get(id=product_id).price_stripe,
#                 }
#                 line_items.append(line_item)
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=line_items,
#                 mode="payment",
#                 payment_method_types =['card',],
#                 success_url= f'{localhost_url}/admin',
#                 cancel_url=f'{localhost_url}/admin',
#             )
#         except Exception as e:
#             return Response({"error":"Product doesn't exist"+str(e)} , status = 500)
#         return JsonResponse({"checkout_url": checkout_session.url})
    
class StripCheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        localhost_url = 'http://localhost:5173'

        try:
            cart = Cart.objects.get(user=request.user)
            line_items = []

            for item in cart.items.all():
                if item.product.quantity < item.quantity:
                    return Response({"error": f"Insufficient stock for {item.product.title}"}, status=400)

                line_item = {
                    'quantity': item.quantity,
                    'price': item.product.price_stripe,
                }
                line_items.append(line_item)

            checkout_session = stripe.checkout.Session.create(

                customer_email=request.user.email,
                line_items=line_items,
                mode="payment",
                payment_method_types=['card'],
                success_url=f'{localhost_url}/success?session_id={{CHECKOUT_SESSION_ID}}',
                cancel_url=f'{localhost_url}/cancel',
            )

        except Exception as e:
            return Response({"error": "Error creating Stripe checkout session" + str(e)}, status=500)

        return JsonResponse({"checkout_url": checkout_session.url})
    
# def success_callback(request):
#     session_id = request.GET.get('session_id')
#     session = stripe.checkout.Session.retrieve(session_id)

#     if session.payment_status == "paid":
#         cart = Cart.objects.get(user=request.user)
#         order = Order.objects.create(
#             user=request.user,
#             total_price=cart.total_price
#         )

#         for item in cart.items.all():
#             OrderProduct.objects.create(
#                 order=order,
#                 product=item.product,
#                 quantity=item.quantity
#             )
#             # Update product stock
#             product = item.product
#             product.quantity -= item.quantity
#             product.save()

#         cart.items.all().delete()  # Clear the cart
#         return HttpResponse(f"Order {order.id} created successfully!")
#     else:
#         return HttpResponse("Payment was not successful")

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
@authentication_classes([TokenAuthentication])
def success_callback(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    session_id = request.GET.get('session_id')

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == "paid":
            with transaction.atomic():
                cart = Cart.objects.select_related().get(user=request.user)
                if not all(item.product.quantity >= item.quantity for item in cart.items.all()):
                    return JsonResponse({"error": "Insufficient stock available for one of the products"}, status=400)
                
                order = Order.objects.create(user=request.user, total_price=cart.total_price)
                for item in cart.items.all():
                    OrderProduct.objects.create(order=order, product=item.product, quantity=item.quantity)
                    item.product.quantity -= item.quantity
                    item.product.save()

                cart.items.all().delete()  # Clear the cart
                return JsonResponse({"message": f"Order {order.id} created successfully!"})
        else:
            return JsonResponse({"error": "Payment was not successful"}, status=400)
    except Exception as e:
        return JsonResponse({"error": "Error processing your payment: " + str(e)}, status=500)