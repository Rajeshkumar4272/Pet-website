
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Package, PawPrint, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

// Navigation items
const mainNav = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
];

export const AdminLayout = ({ children, activePage = 'Dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300", 
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex h-16 items-center gap-2 px-4", 
          sidebarOpen ? "justify-start" : "justify-center"
        )}>
          <PawPrint size={28} className="text-ainopets-purple" />
          {sidebarOpen && (
            <span className="text-xl font-bold tracking-tight">AinoPets</span>
          )}
        </div>
        <Separator />
        
        {/* Nav links */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <Button
                key={item.name}
                variant={activePage === item.name ? "secondary" : "ghost"}
                className={cn(
                  "flex h-10 justify-start",
                  sidebarOpen ? "px-4" : "px-2"
                )}
                asChild
              >
                <a href={item.href} className="flex items-center gap-3">
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.name}</span>}
                </a>
              </Button>
            ))}
          </nav>
        </ScrollArea>
        
        {/* Sidebar toggle */}
        <div className="flex h-16 items-center border-t px-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-9 w-9"
          >
            <Menu size={20} />
          </Button>
          {sidebarOpen && (
            <span className="ml-3 text-sm text-muted-foreground">Toggle sidebar</span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        <div className="container mx-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
