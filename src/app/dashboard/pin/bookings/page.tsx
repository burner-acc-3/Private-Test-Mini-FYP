'use client';

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar, 
  Heart,
  Clock,
  MapPin,
  User,
  XCircle
} from 'lucide-react';

const navigation = [
  { name: 'Search Services', href: '/dashboard/pin', icon: Search },
  { name: 'My Bookings', href: '/dashboard/pin/bookings', icon: Calendar },
  { name: 'Favorites', href: '/dashboard/pin/favorites', icon: Heart },
];

const mockBookings = [
  {
    id: '1',
    service: 'Grocery Shopping Assistance',
    volunteerName: 'John Smith',
    date: '2024-01-20',
    time: '10:00 AM',
    duration: 120,
    status: 'confirmed',
    address: '123 Main St'
  },
  {
    id: '2',
    service: 'Medical Appointment Companion',
    volunteerName: 'Sarah Johnson',
    date: '2024-01-22',
    time: '2:00 PM',
    duration: 180,
    status: 'confirmed',
    address: '456 Oak Ave'
  },
  {
    id: '3',
    service: 'Technology Support',
    volunteerName: null,
    date: '2024-01-25',
    time: '11:00 AM',
    duration: 90,
    status: 'pending',
    address: '123 Main St'
  },
  {
    id: '4',
    service: 'Social Companionship',
    volunteerName: 'Emily Davis',
    date: '2024-01-10',
    time: '3:00 PM',
    duration: 60,
    status: 'completed',
    address: '123 Main St'
  }
];

export default function PINBookingsPage() {
  const upcomingBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = mockBookings.filter(b => b.status === 'completed');

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      alert(`Booking ${id} cancelled`);
    }
  };

  return (
    <DashboardLayout navigation={navigation} userRole="Senior Member">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your service bookings</p>
        </div>

        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No upcoming bookings</p>
                </CardContent>
              </Card>
            ) : (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.service}</h3>
                            {booking.volunteerName && (
                              <p className="text-sm text-gray-600 mt-1">
                                <User className="inline h-4 w-4 mr-1" />
                                Volunteer: {booking.volunteerName}
                              </p>
                            )}
                          </div>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            {booking.time} ({booking.duration} min)
                          </div>
                        </div>

                        <p className="text-sm text-gray-600">
                          <MapPin className="inline h-4 w-4 mr-1" />
                          {booking.address}
                        </p>

                        {booking.status === 'pending' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <p className="text-sm text-yellow-800">
                              We're finding the best volunteer match for you. You'll be notified once confirmed.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 lg:flex-col">
                        <Button variant="outline" className="flex-1 lg:w-32">
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 lg:w-32 text-red-600 hover:text-red-700"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-6">
            {pastBookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.service}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            <User className="inline h-4 w-4 mr-1" />
                            Volunteer: {booking.volunteerName}
                          </p>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(booking.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>

                    <Button variant="outline" className="lg:w-32">
                      Rate Service
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
