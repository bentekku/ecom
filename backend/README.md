# Backend
This is the backend of the e-commerce project, built with Express.js and MongoDB using Mongoose.

## Features
Product management with CRUD operations
Cart management with add and remove functionality
Integration with MongoDB Atlas for data persistence
Basic API endpoints for interacting with products and carts
Setup
1. Install Dependencies:
   ```bash
   npm install
2. Start the Server:
   ```bash
   npm start

## API Endpoints
1. Products
- GET /api/products - Get a list of all products
- POST /api/products - Add a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product
2. Cart
- POST /api/orders/add - Add an item to the cart
- DELETE /api/orders/remove/:id - Remove an item from the cart
- GET /api/orders- Get items in the cart

### Note: Please create a `.env` file in the root of the backend directory. And feed in the following:
- PORT = 5151
- MONGO_URL = mongodb+srv://shadab:letmeinbitch@cluster0.kfie7.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"% 
<br/><br/>For best practices, it was ignored in the project's `.gitignore` file.
