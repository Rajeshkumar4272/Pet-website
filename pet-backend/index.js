 // Import the database connection module
import connectDB from './config/DB.js'; // Import the database connection module
import app from './server.js'; // Import the express application

connectDB()
.then(()=>{
    app.listen(3000, () => { // Start the server on port 3000
        console.log('Aino Petz Backend running on http://localhost:3000'); // Log the server URL
    })
}) // Connect to the database
.catch((error) => {
    console.error('Database connection error:', error); // Log any connection error
    process.exit(1); // Exit the process with failure
})