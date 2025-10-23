'use client';

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  CheckCircle2,
  XCircle,
  MapPin,
  User,
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Assignments', href: '/dashboard/csr', icon: Calendar },
  { name: 'Availability', href: '/dashboard/csr/availability', icon: Clock },
  { name: 'Profile', href: '/dashboard/csr/profile', icon: User },
];

const mockAssignments = [
  {
    id: '1',
    service: 'Grocery Shopping Assistance',
    pinName: 'Margaret Thompson',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: 120,
    address: '123 Oak Street',
    status: 'pending',
    distance: '2.3 km'
  },
  {
    id: '2',
    service: 'Medical Appointment Companion',
    pinName: 'Robert Chen',
    date: '2024-01-16',
    time: '2:00 PM',
    duration: 180,
    address: '456 Maple Avenue',
    status: 'confirmed',
    distance: '4.1 km'
  },
  {
    id: '3',
    service: 'Technology Support',
    pinName: 'Dorothy Williams',
    date: '2024-01-17',
    time: '11:00 AM',
    duration: 90,
    address: '789 Pine Road',
    status: 'pending',
    distance: '1.8 km'
  }
];

export default function CSRDashboard() {
  const handleAccept = (id: string) => {
    alert(`Accepted assignment ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected assignment ${id}`);
  };

  return (
    <DashboardLayout navigation={navigation} userRole="Volunteer">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 md:p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome, Volunteer!</h1>
          <p className="text-green-100">Thank you for making a difference in our community.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rating</CardTitle>
              <Settings className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.9</div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Section */}
        <Card>
          <CardHeader>
            <CardTitle>Service Assignments</CardTitle>
            <CardDescription>Review and manage your service requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAssignments.map((assignment) => (
                <Card key={assignment.id} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{assignment.service}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              <User className="inline h-4 w-4 mr-1" />
                              {assignment.pinName}
                            </p>
                          </div>
                          <Badge variant={assignment.status === 'confirmed' ? 'default' : 'secondary'}>
                            {assignment.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(assignment.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {assignment.time} ({assignment.duration} min)
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {assignment.distance} away
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          {assignment.address}
                        </p>
                      </div>

                      {assignment.status === 'pending' && (
                        <div className="flex gap-2 lg:flex-col">
                          <Button 
                            className="flex-1 lg:w-32" 
                            onClick={() => handleAccept(assignment.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 lg:w-32"
                            onClick={() => handleReject(assignment.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Decline
                          </Button>
                        </div>
                      )}

                      {assignment.status === 'confirmed' && (
                        <div className="lg:w-32">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
