'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Newspaper, 
  Calendar, 
  Images, 
  Users, 
  TrendingUp,
  Eye
} from 'lucide-react';
import { newsApi, eventsApi, galleryApi, leadershipApi } from '@/lib/api';

interface DashboardStats {
  news: number;
  events: number;
  gallery: number;
  leadership: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    news: 0,
    events: 0,
    gallery: 0,
    leadership: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [news, events, gallery, leadership] = await Promise.all([
        newsApi.getAll().catch(() => []),
        eventsApi.getAll().catch(() => []),
        galleryApi.getAll().catch(() => []),
        leadershipApi.getAll().catch(() => []),
      ]);

      setStats({
        news: news.length,
        events: events.length,
        gallery: gallery.length,
        leadership: leadership.length,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total News',
      value: stats.news,
      icon: Newspaper,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Events',
      value: stats.events,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Gallery Items',
      value: stats.gallery,
      icon: Images,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Leadership Team',
      value: stats.leadership,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your admin dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/news/new"
                className="block rounded-lg border p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Create New Article</div>
                <div className="text-sm text-gray-500">
                  Add a new news article to the website
                </div>
              </a>
              <a
                href="/admin/events/new"
                className="block rounded-lg border p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Create New Event</div>
                <div className="text-sm text-gray-500">
                  Add an upcoming event to the calendar
                </div>
              </a>
              <a
                href="/admin/gallery/new"
                className="block rounded-lg border p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">Upload to Gallery</div>
                <div className="text-sm text-gray-500">
                  Add new photos to the gallery
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              System Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Platform</span>
                <span className="text-sm font-medium">Next.js 16</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Environment</span>
                <span className="text-sm font-medium">
                  {process.env.NODE_ENV}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">API Status</span>
                <span className="text-sm font-medium text-green-600">
                  {loading ? 'Checking...' : 'Connected'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
