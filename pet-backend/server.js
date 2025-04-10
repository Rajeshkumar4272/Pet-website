import express from 'express'; // Import the express module
const app=express(); // Create an express application

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(express.urlencoded({extended:true})); // Middleware to parse URL-encoded request bodies

app.get('/',(req,res)=>{ // Define a GET route for the root URL
    res.status(200).json
({ // Send a JSON response with a status of 200
        message:"Welcome to Aino Petz Backend" // Message in the JSON response
    })
})
import productRoutes from './routes/productRoutes.js'; // Import product routes
app.use('/api/products',productRoutes); // Use product routes for the /api/products URL



export default app; // Export the express application for use in other modules
