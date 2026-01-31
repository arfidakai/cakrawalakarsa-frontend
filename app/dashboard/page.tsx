import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Newspaper, Calendar, Image, Users, TrendingUp, Eye } from 'lucide-react'

const stats = [
  {
    title: 'Total News',
    value: '24',
    icon: Newspaper,
    trend: '+12%',
    trendUp: true,
  },
  {
    title: 'Upcoming Events',
    value: '8',
    icon: Calendar,
    trend: '+3',
    trendUp: true,
  },
  {
    title: 'Gallery Images',
    value: '156',
    icon: Image,
    trend: '+18',
    trendUp: true,
  },
  {
    title: 'Total Views',
    value: '12.5K',
    icon: Eye,
    trend: '+8.2%',
    trendUp: true,
  },
]

const recentActivity = [
  {
    action: 'New article published',
    title: 'Kegiatan Bakti Sosial 2026',
    time: '2 hours ago',
  },
  {
    action: 'Event updated',
    title: 'Workshop Leadership',
    time: '5 hours ago',
  },
  {
    action: 'Gallery image added',
    title: 'Event Photos - January',
    time: '1 day ago',
  },
  {
    action: 'Team member added',
    title: 'New Division Head',
    time: '2 days ago',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Newspaper className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Add News</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Calendar className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Add Event</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Image className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Upload Image</p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                <p className="text-sm font-medium">Add Member</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
