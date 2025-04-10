import {Product} from "../model/productModel.js";
const CreateProduct = async (req, res) => {
    try {
        const { name, description, price, countInStock } = req.body; // Destructure the request body to get product details
        const product = await Product.create({ // Create a new product using the Product model
            name,
            description,
            price,
            countInStock,
        });
        res.status(201).json({ // Return a 201 status code with the newly created product
            success: true,
            product,
        });
    }
    
    catch (error) {
        res.status(500).json({ // Return a 500 status code with an error message
            success: false,
            message: error.message,
        });
    }
}

const GetProduct=async(req,res)=>{
    try {
        const data=await Product.find({}); // Find all products in the database
        if(!data){
            return res.status(404).json({ // Return a 404 status code if no products are found
                success:false,
                message:"No Products Found"
            })
        }
        res.status(200).json({ // Return a 200 status code with the products
            success:true,
            data
        })
    } catch (error) {
        res.status(500).json({ // Return a 500 status code with an error message      
            success:false,
            message:error.message
        })
    }
}
const UpdateProduct=async(req,res)=>{
    try {
        const id=req.params.id; // Get the product ID from the URL parameters
        const data = req.body; // Destructure the request body to get product details
        const updateProduct = await Product.findByIdAndUpdate({_id:id},data,{new:true}); // Update the product in the database
        if(!updateProduct){
            return res.status(404).json({ // Return a 404 status code if the product is
                success:false,
                message:"Product Not Found"
            })
        }
        res.status(200).json({ // Return a 200 status code with the updated product
            success:true,
            updateProduct
        })
    }
    catch (error) {
        res.status(500).json({ // Return a 500 status code with an error message
            success:false,
            message:error.message
        })
    }
}

const DeleteProduct=async(req,res)=>{
    try {
        const id=req.params.id; // Get the product ID from the URL parameters
        const deleteProduct = await Product.findByIdAndDelete({_id:id}); // Delete the product from the database
        if(!deleteProduct){
            return res.status(404).json({ // Return a 404 status code if the product is
                
                success:false,
                message:"Product Not Found"
            })
            }
        res.status(200).json({ // Return a 200 status code with the deleted product
            
            success:true,
            message:"Product Deleted Successfully"
        })
    }
    catch (error) {
        res.status(500).json({ // Return a 500 status code with an error message
            success:false,
            message:error.message
        })
    }
}

    

export {
    CreateProduct,
    GetProduct,
    UpdateProduct,
    DeleteProduct
}
