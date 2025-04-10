import express from 'express';
const router = express.Router(); // Create a new router instance

import { CreateProduct,GetProduct,UpdateProduct,DeleteProduct } from '../controllers/productController.js'; // Import the product controller

router.route('/createProduct').post(CreateProduct); // Define a POST route for creating a product
router.route('/getProduct').get(GetProduct); // Define a GET route for fetching all products
router.route('/updateProduct/:id').patch(UpdateProduct); // Define a PUT route for updating a product by ID
router.route('/deleteProduct/:id').delete(DeleteProduct); // Define a DELETE route for deleting a product by ID

export default router; // Export the router for use in other modules
