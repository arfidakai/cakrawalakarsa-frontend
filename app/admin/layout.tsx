'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Images, 
  Users, 
  Building2,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/components/ui/utils';
import { useState } from 'react';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'News',
    href: '/admin/news',
    icon: Newspaper,
  },
  {
    title: 'Events',
    href: '/admin/events',
    icon: Calendar,
  },
  {
    title: 'Gallery',
    href: '/admin/gallery',
    icon: Images,
  },
  {
    title: 'Leadership',
    href: '/admin/leadership',
    icon: Users,
  },
  {
    title: 'Divisions',
    href: '/admin/divisions',
    icon: Building2,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('auth_token');
    // Redirect to login
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Logout Button */}
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Bar */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-800">
              DEMA Cakrawala Karsa
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin User</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
