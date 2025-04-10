
import { AdminLayout } from '@/components/AdminLayout';
import { ProductTable } from '@/components/ProductTable';

const Products = () => {
  return (
    <AdminLayout activePage="Products">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory, add new products, and update existing ones.
          </p>
        </div>
        
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Products;
