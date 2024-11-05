## Online Marketplace API
This is a backend API for an online marketplace that allows users to register, log in, and manage products. The API uses Firebase for user authentication and Firestore as the database for storing product information.

### Features

- User Registration: Allows users to register with email and password.
- User Login: Allows users to log in and receive a custom authentication token.

- Product Management:
- Add new products.
 - List all products.
- Update product details.
- Delete products.

- Error Handling: Provides error handling middleware to handle unexpected errors.

### Tech Stack
- Node.js: JavaScript runtime.
- Express.js: Web framework for handling routes and HTTP requests.
 - Firebase Admin SDK: For Firebase authentication and Firestore database operations.

- Joi: For schema validation of input data.
- CORS: Middleware for enabling Cross-Origin Resource Sharing.
- dotenv: For loading environment variables.

#### Prerequisites
- Node.js installed.
 - Firebase Project set up (for Firestore and Firebase Authentication).
- Firebase service account credentials (JSON file).

 ###Getting Started
1. Clone the repository

git clone https://github.com/TshepoMadira/Online-Marketplace2.git

cd Online-Marketplace2
2. Install dependencies
Run the following command to install the required dependencies:


npm install
3. Set up Firebase Admin SDK
You need to have Firebase service account credentials.

- Go to the Firebase Console: https://console.firebase.google.com.
Create a project (if you haven't already).
Under the Project Settings > Service Accounts, generate a new private key for your service account.
Download the JSON file and place it in the /config folder (or any other folder of your choice).
Make sure to rename the file to online-marketplace-2b6af-firebase-adminsdk-4z5u4-c1b69585f8.json or update the filename in your code.

4. Create a .env file
Create a .env file in the root directory and add the following environment variables:


PORT=5000
5. Start the server
Run the following command to start the server:


npx run dev
The API will be available at http://localhost:5000.

API Endpoints
1. User Registration
POST /api/products/register

Registers a new user by email and password.

Request Body:


{
  "email": "user@example.com",
  "password": "your_password"
}
Response:


{
  "uid": "USER_ID"
}
2. User Login
POST /api/products/login

Logs in a user with email and password, and returns a custom authentication token.

Request Body:


{
  "email": "user@example.com",
  "password": "your_password"
}
Response:

{
  "token": "CUSTOM_AUTH_TOKEN"
}
3. Add Product
POST /api/products/add

Adds a new product to the marketplace.

Request Body:


{
  "name": "Product Name",
  "price": 100.0,
  "description": "Product description",
  "size": "Medium",
  "color": "Red",
  "category": "Technology"
}
Response:


{
  "id": "PRODUCT_ID",
  "name": "Product Name",
  "price": 100.0,
  "description": "Product description",
  "size": "Medium",
  "color": "Red",
  "category": "Technology"
}
4. List Products
GET /api/products

Retrieves all products from the marketplace.

Response:


[
  {
    "id": "PRODUCT_ID",
    "name": "Product Name",
    "price": 100.0,
    "description": "Product description",
    "size": "Medium",
    "color": "Red",
    "category": "Technology"
  }
]
5. Update Product
PUT /api/products/update/:id

Updates a product's information by its ID.

Request Body:


{
  "name": "Updated Product Name",
  "price": 150.0,
  "description": "Updated description",
  "size": "Large",
  "color": "Blue"
}
Response:


{
  "message": "Product updated successfully"
}
6. Delete Product
DELETE /api/products/delete/:id

Deletes a product from the marketplace by its ID.

Response:


{
  "message": "Product deleted successfully"
}
Error Handling
The application has global error handling in place to catch any unhandled errors and return a generic response.

Response (on error):

{
  "error": "Something went wrong!"
}
Testing
You can use Postman or any other API client to test the API. Make sure to replace localhost:5000 with the actual server URL if deploying to production.

Example requests
Register user:
POST request to /api/products/register


{
  "email": "newuser@example.com",
  "password": "securepassword"
}
Login user:
POST request to /api/products/login


{
  "email": "newuser@example.com",
  "password": "securepassword"
}
Add product:
POST request to /api/products/add


{
  "name": "Smartphone",
  "price": 499.99,
  "description": "Latest model smartphone",
  "size": "Medium",
  "color": "Black",
  "category": "Technology"
}