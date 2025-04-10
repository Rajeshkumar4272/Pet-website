
import { AdminLayout } from '@/components/AdminLayout';
import { DashboardOverview } from '@/components/DashboardOverview';
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout activePage="Dashboard">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <a href="/products">
              <Package className="mr-2 h-4 w-4" />
              Manage Products
            </a>
          </Button>
        </div>
        
        <div className="space-y-6">
          <DashboardOverview />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <img 
              src="https://placehold.co/300x150/e5deff/9b87f5?text=AinoPets+Analytics" 
              alt="Analytics Placeholder"
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x150/d3e4fd/9b87f5?text=Recent+Sales" 
              alt="Recent Sales Placeholder"
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x150/e5deff/9b87f5?text=Top+Products" 
              alt="Top Products Placeholder" 
              className="rounded-lg"
            />
            <img 
              src="https://placehold.co/300x150/d3e4fd/9b87f5?text=Inventory+Status" 
              alt="Inventory Status Placeholder"
              className="rounded-lg"
            />
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-medium mb-4">Welcome to AinoPets Admin Panel</h3>
            <p className="text-muted-foreground mb-4">
              This dashboard gives you an overview of your product inventory. 
              Manage your pet products, track stock levels, and monitor your 
              business performance all in one place.
            </p>
            <Button variant="outline" asChild>
              <a href="/products">View All Products</a>
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
