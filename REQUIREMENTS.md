## Api Endpoint

#### Users routes

[POST] '/users' ===> to create new user.
[GET] '/users' ===> to get all users.
[GET] '/users/:id' ===> to get a single user.
[POST] '/authenticate' ===> to authenticate user.

#### Products routes

[POST] '/products' ===> to create new product.
[GET] '/products' ===> to get all products.
[GET] '/products/:id' ===> to get a single product.

#### Orders routes

[POST] '/orders' ===> to create new order.
[GET] /orders/current_order' ===> to get the order for specific user

## Database schema

### Users table

| id  |     email      | user_name  |    first_name    |    last_name    |                           password                           |
| :-: | :------------: | :--------: | :--------------: | :-------------: | :----------------------------------------------------------: |
|  1  | admin@test.com | admin_user | admin_first_name | admin_last_name | $2b$10$oNZ7RQBYDIpGcizjaDJ9C.s7F2bAynquWItphQ1U9P7Ill8SV.G8K |

#### Users data types

-   **id**: serial PRIMARY KEY
-   **email**: varchar(50) UNIQUE
-   **user_name**: varchar(50) UNIQUE
-   **first_name**: VARCHAR(25)
-   **last_name**: VARCHAR(25)
-   **password**: VARCHAR(255)

---

### Products table

| id  |       name       | price |
| :-: | :--------------: | :---: |
|  1  | my first product |  10   |

#### Products data types

-   **id**: serial PRIMARY KEY
-   **name**: VARCHAR(255)
-   **price**: INTEGER

---

### Orders table

| id  | status | user_id |
| :-: | :----: | :-----: |
|  1  | active |    1    |

####Orders data types

-   **id**: serial PRIMARY KEY
-   **status**: VARCHAR(50)
-   **user_id**: INTEGER NOT NULL REFERENCES users(id)

---

### Orders_products table

| id  | quantity | order_id | product_id |
| :-: | :------: | :------: | :--------: |
|  1  |  active  |    5     |     1      |

####Orders_products data types

-   **id**: serial PRIMARY KEY
-   **quantity**: INTEGER
-   **order_id**: INTEGER NOT NULL REFERENCES orders(id)
-   **product_id**: INTEGER NOT NULL REFERENCES products(id)
