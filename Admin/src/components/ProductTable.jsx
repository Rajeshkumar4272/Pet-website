
import { useState } from 'react';
import { useProducts } from '@/contexts/ProductContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ProductForm } from '@/components/ProductForm';
import { DeleteProduct } from '@/components/DeleteProduct';
import { Search, Plus } from "lucide-react";

export const ProductTable = () => {
  const { products, searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  
  const filteredProducts = searchQuery ? searchProducts(searchQuery) : products;
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const handleEdit = (product) => {
    setEditingProduct(product);
  };
  
  const handleDelete = (product) => {
    setDeletingProduct(product);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="bg-ainopets-purple hover:bg-ainopets-purple/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery 
                ? "Try adjusting your search query" 
                : "Get started by adding a new product"}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                variant="outline" 
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 10 
                        ? 'bg-red-100 text-red-800' 
                        : product.stock < 30 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(product)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Add/Edit Product Form Modal */}
      {(isAddModalOpen || editingProduct) && (
        <ProductForm
          product={editingProduct}
          isOpen={isAddModalOpen || !!editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
      
      {/* Delete Confirmation */}
      {deletingProduct && (
        <DeleteProduct
          product={deletingProduct}
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};
