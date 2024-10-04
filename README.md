# MotorHub

## Description

MotorHub is a modern, user-friendly web application designed for car enthusiasts and buyers. Users can browse through an extensive collection of cars, compare different models, and manage their car configurations and orders. The app offers a comprehensive car marketplace platform with features tailored for both users and administrators, ensuring an engaging and efficient experience for all.

## User Stories

- **404**: As an anon/user/admin, I can see a 404 page if I try to reach a page that does not exist, so I know it's my fault.
- **Signup**: As an anon, I can sign up on the platform so that I can start configuring cars, placing orders and reviewing cars.
- **Login**: As a user, I can log in to the platform so that I can start configuring cars and placing orders.
- **Logout**: As a user, I can log out from the platform so no one else can modify my information.
- **Configure**: As a user, I can configure a car by changing its color and features.
- **Delete Configuration**: As a user, I can delete configurations from my list.
- **View Orders**: As a user, I can view my previous car orders.
- **Compare Cars**: As a user, I can compare different car models side by side to evaluate features and performance.
- **Write Reviews**: As a user, I can write a review for a car.
- **Delete Reviews**: As a user, I can delete the reviews that I made.
- **Check Profile**: As a user, I can check my profile.
- **Edit Profile**: As a user, I can edit my profile.

## Admin Stories

- **404**: As an anon/user/admin, I can see a 404 page if I try to reach a page that does not exist, so I know it's my fault.
- **Signup**: As an admin, I can sign up on the platform through another admin 
- **Login**: As a user, I can log in to the platform 
- **Logout**: As a admin, I can log out from the platform so no one else can modify my information.
- **Configure**: As a admin, I can configure a car by changing its color and features.
- **Delete Configuration**: As a admin, I can delete configurations from my list.
- **View Orders**: As a admin, I can view my previous car orders.
- **Compare Cars**: As a admin, I can compare different car models side by side to evaluate features and performance.
- **View All Orders**: As a admin, I can view orders from all the users.
- **Accept Orders**: As a admin, I can accept a users order.
- **Reject Orders**: As a admin, I can reject a users order.
- **View All Users**: As a admin, I can view all the users on the platform.
- **Delete Users**: As a admin, I can delete a user from the platform.
- **Write Reviews**: As a admin, I can write a review for a car.
- **Delete All Reviews**: As a admin, I can delete the all reviews.
- **Check Profile**: As a admin, I can check my profile and account details.
- **Edit Profile**: As a admin, I can edit my profile.

## Backlog

- Wishlist functionality for future car purchases.
- Adding multiple images for one car.
- Adding a car model that changes while configuring.
- Used car listing page for users
- payment module
- email notification for creating, accepting/rejecting orders

---

## Client / Frontend

### React Router Routes (React App)

| Path                      | Component                       | Permissions                 | Behavior                                                      |
| ------------------------- | ------------------------------- | --------------------------- | ------------------------------------------------------------- |
| `/`                       | HomePage                        | Public                      | Displays the homepage with car reviews, featured content, and navigation. |
| `/signup`                 | SignupPage                      | Anon only `<AnonRoute>`      | Signup form for new users, redirects to homepage after signup. |
| `/login`                  | LoginPage                       | Anon only `<AnonRoute>`      | Login form for existing users, redirects to homepage after login. |
| `/logout`                 | N/A                             | User only `<PrivateRoute>`   | Logs the user out and redirects to homepage.                   |
| `/profile/:userId/edit`    | EditProfilePage                 | User only `<PrivateRoute>`   | Allows users to edit their profile information.                |
| `/dashboard`              | UserDashboard                   | User only `<PrivateRoute>`   | Displays the user's dashboard with car configurations and orders. |
| `/cars`                   | CarListPage                     | Public                      | Displays a list of all available cars in the marketplace.       |
| `/cars/:carId`            | CarPage                         | Public                      | Displays detailed information about a selected car.            |
| `/cars/:carId/configure`   | CarConfigurationPage            | User only `<PrivateRoute>`   | Allows users to configure a selected car (features, color, etc.). |
| `/compare`                | CarComparisonPage               | User only `<PrivateRoute>`   | Allows users to compare different car models side by side.      |
| `/user/:userId/orders`     | OrdersPage                      | User only `<PrivateRoute>`   | Displays the user's previous car orders.                       |
| `/user/configurations`     | ConfigurationsPage              | User only `<PrivateRoute>`   | Displays the user's saved car configurations.                  |
| `/inventory`              | InventoryPage                   | Admin only `<AdminRoute>`    | Allows admin users to view and manage the car inventory.        |
| `/admin/new-car`          | CarCreationPage                 | Admin only `<AdminRoute>`    | Allows admin users to add a new car to the inventory.           |
| `/admin/users`            | UserManagement                  | Admin only `<AdminRoute>`    | Allows admin users to manage user accounts.                    |
| `/admin/cars/:carId/edit` | CarEditingPage                  | Admin only `<AdminRoute>`    | Allows admin users to edit details of an existing car.          |
| `/admin/orders`           | AdminOrdersPage                 | Admin only `<AdminRoute>`    | Displays and manages all user orders (admin access).            |
| `/admin/signup`           | AdminSignUp                     | Admin only `<AdminRoute>`    | Allows admin users to create new admin accounts.                |
| `*`                       | ErrorPage                       | Public                      | Displays a 404 error page for any undefined routes.             |
                                |

### Components

- **IsAdmin**: A higher-order component that restricts access to routes only for admin users. Admin-specific routes like inventory management, car creation, and order management are wrapped in this component.
  
- **IsAnon**: A higher-order component that restricts access to routes for anonymous users (non-logged-in users). It ensures logged-in users cannot access pages like login and signup.
  
- **IsPrivate**: A higher-order component that ensures only authenticated users can access certain pages like the dashboard, car configuration, and user orders.

- **Navbar**: The main navigation component visible on all pages. It adjusts based on user roles (admin, user, anon) and provides links to the homepage, user dashboard, car listings, and admin features.
  
- **HomePage**: Displays the homepage with a carousel of car images, video content, and links to various sections of the app (e.g., car listings, inventory, and car comparison).
  
- **SignupPage**: A form that allows anonymous users to sign up for a new account on the platform. Once signed up, users are redirected to the homepage.
  
- **LoginPage**: A form that allows existing users to log in. Once logged in, users are redirected to the homepage.
  
- **UserDashboard**: Displays the user's profile with access to car configurations, orders, and profile settings.
  
- **CarListPage**: Displays a list of all available cars in the marketplace. Each car can be clicked for more details on the individual car page.
  
- **CarPage**: Displays detailed information about a specific car, including images, technical specifications, and price.
  
- **CarConfigurationPage**: Allows users to configure a selected car by choosing from available features, colors, and other customization options. Only accessible to logged-in users.
  
- **CarComparisonPage**: Allows users to compare multiple cars side by side, highlighting differences in features, price, and performance.
  
- **ConfigurationsPage**: Displays all of a user's saved car configurations. Users can view, delete, or modify their configurations here.
  
- **OrdersPage**: Displays a list of orders made by the user. Each order can be viewed in detail, showing the car purchased and its configuration.
  
- **InventoryPage**: Admin-only page that shows the current car inventory. Admins can add, edit, or delete cars from the inventory.
  
- **CarCreationPage**: Allows admin users to create a new car and add it to the inventory. The form includes fields for car make, model, year, price, and available features.
  
- **CarEditingPage**: Allows admin users to edit the details of an existing car, such as updating the price, features, or availability.
  
- **UserManagement**: Admin-only page for managing user accounts. Admins can view, edit, or delete user accounts and assign administrative privileges.
  
- **AdminOrdersPage**: Admin-only page displaying all user orders, where admins can view and manage orders.
  
- **EditProfilePage**: Allows users to edit their profile information, including username, email, and password.
  
- **AdminSignUp**: Admin-only page for creating new admin accounts. This allows admins to add new administrators to manage the platform.
  
- **ReviewForm**: A form component where users can submit their reviews for specific cars.
  
- **Reviews**: Displays a list of user reviews for a car. This component likely fetches and displays the reviews that users have submitted for each car.
  
- **VideoPlayer**: A video player component used to display promotional or review videos of cars on pages like the homepage.
  
- **ErrorPage**: A generic error page that is displayed when users navigate to a route that doesn’t exist or encounter an unexpected error.

### Services

#### **Auth Service**
This service handles everything related to user authentication, including login, signup, and session management.

- **`auth.login(user)`**: Sends a login request to the backend with the user's credentials (email and password). Upon success, it stores the authentication token and logs in the user.
  
- **`auth.signup(user)`**: Sends a signup request to the backend with user details like name, email, and password. Creates a new user account and logs in the user automatically upon success.

- **`auth.logout()`**: Logs out the current user by clearing the session token from storage and redirects the user to the homepage.

- **`auth.me()`**: Verifies the current session and retrieves the user's profile information from the backend, such as their name, email, and admin status.

#### **Car Service**
Handles all actions related to car data retrieval, creation, updating, and deletion. It interacts with the backend to manage the car inventory and user interactions with cars.

- **`car.getAll()`**: Fetches all available cars from the backend. Used to display the full list of cars on the `CarListPage`.

- **`car.getById(id)`**: Fetches detailed information about a specific car based on its ID. Used on the `CarPage` to show car details like images, features, and price.

- **`car.add(newCar)`**: Allows an admin to add a new car to the inventory by sending the new car details (make, model, year, price, etc.) to the backend.

- **`car.update(id, carData)`**: Allows an admin to update the details of a specific car. The car's ID and updated data are sent to the backend.

- **`car.delete(id)`**: Deletes a specific car from the inventory (admin only).

- **`car.configure(id, configuration)`**: Allows users to configure a car by selecting available features and colors. The configuration is saved and associated with the user.

#### **Order Service**
Manages car orders, allowing users to place orders and admins to manage them.

- **`order.getByUserId(userId)`**: Fetches all orders placed by a specific user. Used on the `OrdersPage` to display a user's order history.

- **`order.create(orderData)`**: Creates a new order when a user places an order for a car. The order includes details like the configured car and the user's information.

- **`order.getAll()`**: Fetches all orders from the backend (admin only). Used on the `AdminOrdersPage` to display all user orders for management.

#### **Review Service**
Handles user reviews for cars, allowing users to submit and view reviews.

- **`review.getByCarId(carId)`**: Fetches all reviews for a specific car. Used on the `Reviews` component to display reviews for a car on its detail page.

- **`review.add(carId, reviewData)`**: Allows a user to submit a review for a specific car. This includes the review content, rating, and any other relevant information.

#### **Configuration Service**
Handles user car configurations, allowing users to save, view, and delete car configurations.

- **`configuration.getByUserId(userId)`**: Fetches all car configurations saved by a specific user. Used on the `ConfigurationsPage` to display the user's saved configurations.

- **`configuration.add(carId, configData)`**: Allows a user to save a new car configuration. The configuration includes details like selected features, colors, and model specifications.

- **`configuration.delete(configId)`**: Deletes a specific configuration from the user's saved configurations.

#### **Inventory Service**
Admin-only service that manages the car inventory, allowing admins to add, update, or delete cars.

- **`inventory.getAll()`**: Fetches the full car inventory from the backend, including cars that are unavailable for sale.

- **`inventory.update(id, inventoryData)`**: Allows admins to update inventory details such as car quantity or location.

- **`inventory.add(carData)`**: Allows admins to add new cars to the inventory.

- **`inventory.delete(id)`**: Allows admins to remove cars from the inventory.

---

## Server / Backend

### Models

**User model**:

```javascript
make: { 
        type: String, 
        required: true
    },
    model: [{ 
        type: String, 
        required: true 
    }],
    year: { 
        type: String, 
        required: true 
    },
    trim: [{ 
        type: String 
    }],
    engine: [{ 
        type: String 
    }],
    engineHorsepower: [{ 
        type: Number 
    }],
    transmission: [{ 
        type: String,
    }],
    interiorColor: [colorSchema],
    exteriorColor: [colorSchema],
    features: [String],
    price: { 
        type: Number, 
        required: true 
    },
    available: { 
        type: Boolean, 
        default: true 
    },
    quantity: {
        type: Number
    },
    location: {
        type: String
    },
    images: [String],
}
```
**Orders model**:

```javascript
{
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    configurationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  car:{
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Accepted', 'Rejected','Pending'],  
        default: 'Pending' 
    }

```
**Review model**:

```javascript
{
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    car: { 
        type: Schema.Types.ObjectId, 
        ref: 'Car',  
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    comment: { 
        type: String 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}

```
**User model**:

```javascript
{
    firstname: { 
        type: String, 
        required: true
    },
    lastname: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    savedConfigurations: [
        {
          car: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
          },
          make: String,
          model: String,
          year: String,
          trim: String,
          engine: String,
          transmission: String,
          interiorColor: String,
          exteriorColor: String,
          features: [String],
          price: Number,
          isOrdered: {
            type: Boolean,
            default: false, 
            }
        }
      ],
    isAdmin: { 
        type: Boolean, 
        default: false,
        required: true
    }
}

```

## API Endpoints

### **Auth and User Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `POST`      | `/signup`                       | `{ email, password, firstname, lastname }`   | 201            | 400          | Creates a new user account. Performs email and password validation.         |
| `POST`      | `/admin/signup`                 | `{ email, password, firstname, lastname }`   | 201            | 400          | Creates a new admin account with `isAdmin` set to `true`.                   |
| `POST`      | `/login`                        | `{ email, password }`                        | 200            | 400, 401     | Logs in an existing user or admin.                                          |
| `GET`       | `/verify`                       | None                                         | 200            | 401          | Verifies if a JWT token is valid and retrieves the logged-in user’s details.|
| `PUT`       | `/profile/:userId/edit`         | `{ email, password, firstname, lastname }`   | 200            | 400, 500     | Updates a user's profile, including the ability to change password.         |
| `GET`       | `/user/profile`                 | None                                         | 200            | 404          | Retrieves profile information of the logged-in user, excluding the password.|

### **Car Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `GET`       | `/cars`                         | None                                         | 200            | 500          | Fetches all cars where the quantity field does not exist or is `null`.       |
| `GET`       | `/cars/:carId`                  | None                                         | 200            | 404, 500     | Retrieves details of a specific car by its `carId`.                         |
| `POST`      | `/admin/newCar`                 | `{ carDetails }` and an image file           | 201            | 500          | Allows an admin to add a new car with details and image.                    |
| `PUT`       | `/admin/cars/:carId/edit`       | `{ carDetails }` and optionally an image     | 200            | 404, 500     | Admin route to edit car details and upload a new image.                     |
| `DELETE`    | `/admin/cars/:carId`            | None                                         | 200            | 404, 500     | Admin route to delete a car from the database.                              |
| `GET`       | `/cars/images`                  | None                                         | 200            | 500          | Fetches all car images from the database.                                   |

### **Configuration Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `POST`      | `/cars/:carId/configure`        | `{ engine, transmission, exteriorColor, interiorColor, features, price }` | 200            | 404, 500     | Allows a user to configure a car with custom options and saves it to their profile.|
| `GET`       | `/user/configurations`          | None                                         | 200            | 404, 500     | Fetches all saved configurations of the logged-in user.                     |
| `DELETE`    | `/user/configurations/:configurationId` | None                                    | 200            | 404, 500     | Deletes a specific configuration from the user's saved configurations.      |

### **Order Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `POST`      | `/user/:configurationId/order`  | None                                         | 201            | 400, 404, 500| Creates a new order for a car based on the user's saved configuration.       |
| `GET`       | `/user/:userId/orders`          | None                                         | 200            | 404, 500     | Retrieves all orders made by the logged-in user.                            |
| `GET`       | `/admin/orders`                 | None                                         | 200            | 500          | Admin route to fetch all orders made by all users.                          |
| `PATCH`     | `/admin/orders/:orderId/accept` | None                                         | 200            | 500          | Admin route to accept an order by updating the order status to 'Accepted'.  |
| `PATCH`     | `/admin/orders/:orderId/reject` | None                                         | 200            | 500          | Admin route to reject an order by updating the order status to 'Rejected'.  |

### **Inventory Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `GET`       | `/inventory`                    | None                                         | 202            | 500          | Fetches all cars in inventory (where `quantity` exists or is not `null`).   |
| `GET`       | `/inventory/:carId`             | None                                         | 200            | 404, 500     | Fetches details of a specific car in the inventory by its `carId`.           |
| `PUT`       | `/admin/inventory/:carId`       | `{ carDetails }`                             | 200            | 404, 500     | Admin route to update the inventory details of a car.                       |

### **Review Routes**
| HTTP Method | URL                             | Request Body                                 | Success Status | Error Status | Description                                                                 |
| ----------- | ------------------------------- | -------------------------------------------- | -------------- | ------------ | --------------------------------------------------------------------------- |
| `POST`      | `/cars/:carId/reviews`          | `{ rating, comment }`                        | 201            | 400, 500     | Allows a user to post a review for a specific car. Ensures one review per user per car.|
| `GET`       | `/cars/:carId/reviews`          | None                                         | 200            | 500          | Fetches all reviews for a specific car, including user information.         |
| `DELETE`    | `/reviews/:reviewId`            | None                                         | 200            | 403, 500     | Deletes a review by its `reviewId`. Only the user who posted it or an admin can delete it.|

---

## Links

### Trello/Kanban

[Link to your Trello board](https://trello.com/b/TStbHONo/motorhub)

### Git

- [Client repository Link](https://github.com/Addiyo22/MotorHub_Client)
- [Server repository Link](https://github.com/Addiyo22/MotorHub_Server)

### Deployed App

[Deployed App Link](https://motorhub.netlify.app)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1zndKZ8DC-_i391alptPKsAKanCSXTrLVL39L3xtEjz8/edit?usp=sharing)

---
