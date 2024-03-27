# E-commerce App APIs

This API provides CRUD operations for managing clients, products, wishlists, carts, reviews, and orders.

## Endpoints
### Authentication (register) 

- **Endpoint**: `/register/`
- **Method**: POST
- **Description**: Register a user.
- **Example Request (Create)**:
    ```json
    {
        "username": "your name",
        "email": "email@gmail.com",
        "password": "your password",
    }
    ```
    
### Authentication (login) 

- **Endpoint**: `/login/`
- **Method**: POST
- **Description**: login a user and generate a unique token for him.
- **Example Request (Create)**:
    ```json
    {
        "username": "your name",
        "password": "your password",
    }
    ```
### Clients

#### List/Create Clients
- **Endpoint**: `/clients/`
- **Method**: GET, POST
- **Description**: Retrieve a list of clients or create a new client.
- **Example Request (Create)**:
    ```json
    {
        "user": 1,
        "phone_number": "+1234567890",
        "address": "123 Main St",
        "info_livraison": "Delivery instructions",
        "photo": "path/to/picture"
    }
    ```

#### Retrieve/Update/Delete Client
- **Endpoint**: `/clients/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific client.
- **Example Request (Update)**:
    ```json
    {
        "phone_number": "+9876543210",
        "address": "456 Oak St",
        "info_livraison": "Updated delivery instructions",
        "photo": "path/to/picture",
    }
    ```

### Products

#### List/Create Products
- **Endpoint**: `/products/`
- **Method**: GET, POST
- **Description**: Retrieve a list of products or create a new product.
- **Example Request (Create)**:
    ```json
    {
        "quantity": 10,
        "description": "Product description",
        "title": "Product Title",
        "price": 19.99,
        "photo": "path/to/picture",
        "photo_add1" : "path/to/picture", (optionel)
        "photo_add2" : "path/to/picture", (optionel)
        "photo_add3" : "path/to/picture", (optionel)
        "photo_add4" : "path/to/picture",  (optionel)
        "state": "pending",
        "rating": 4.5
    }
    ```

#### Retrieve/Update/Delete Product
- **Endpoint**: `/products/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific product.
- **Example Request (Update)**:
    ```json
    {
        "quantity": 15,
        "description": "Updated description",
        "title": "Updated Title",
        "price": 24.99,
        "state": "shipping",
        "rating": 4.8
    }
    ```

### Wishlists

#### List/Create Wishlists
- **Endpoint**: `/wishlists/`
- **Method**: GET, POST
- **Description**: Retrieve a list of wishlists or create a new wishlist.
- **Example Request (Create)**:
    ```json
    {
        "user": 1,
        "products": [1, 2, 3]
    }
    ```

#### Retrieve/Update/Delete Wishlist
- **Endpoint**: `/wishlists/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific wishlist.
- **Example Request (Update)**:
    ```json
    {
        "products": [2, 3, 4]
    }
    ```

### Carts

#### List/Create Carts
- **Endpoint**: `/carts/`
- **Method**: GET, POST
- **Description**: Retrieve a list of carts or create a new cart.
- **Example Request (Create)**:
    ```json
    {
        "user": 1,
        "products": [1, 2, 3],
        "total_price": 49.99,
        "coupone": "COUPON123"
    }
    ```

#### Retrieve/Update/Delete Cart
- **Endpoint**: `/carts/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific cart.
- **Example Request (Update)**:
    ```json
    {
        "products": [2, 3, 4],
        "total_price": 59.99,
        "coupone": "NEWCOUPON456"
    }
    ```

### Reviews

#### List/Create Reviews
- **Endpoint**: `/reviews/`
- **Method**: GET, POST
- **Description**: Retrieve a list of reviews or create a new review.
- **Example Request (Create)**:
    ```json
    {
        "user": 1,
        "text": "Great product!",
        "date": "2023-01-15",
        "rating": 5.0
    }
    ```

#### Retrieve/Update/Delete Review
- **Endpoint**: `/reviews/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific review.
- **Example Request (Update)**:
    ```json
    {
        "text": "Updated review text",
        "rating": 4.8
    }
    ```

### Orders

#### List/Create Orders
- **Endpoint**: `/orders/`
- **Method**: GET, POST
- **Description**: Retrieve a list of orders or create a new order.
- **Example Request (Create)**:
    ```json
    {
        "user": 1,
        "products": [1, 2, 3]
    }
    ```

#### Retrieve/Update/Delete Order
- **Endpoint**: `/orders/<int:pk>/`
- **Method**: GET, PUT, DELETE
- **Description**: Retrieve, update, or delete a specific order.
- **Example Request (Update)**:
    ```json
    {
        "products": [2, 3, 4]
    }
    ```

#### Search
- **Endpoint**: `/search/`
- **Method**: POST
- **Description**: search a product based on user's specification.
- **Example Request**:
    ```json
    {
        "Text": "title or keywords",
        "max_price" : 13.15 (optionel)
    }
    ```

#### Search
- **Endpoint**: `/stripe/`
- **Method**: POST
- **Description**: redirect a user to a chekout page (stripe) using the id of .
- **Example Request**:
    ```json
    {
        "quantity": 5,
        "id" : 2 (product id)
    }
    ```
