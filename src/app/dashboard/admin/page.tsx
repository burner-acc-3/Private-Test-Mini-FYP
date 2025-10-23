'use client';

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Mail
} from 'lucide-react';

const navigation = [
  { name: 'Applications', href: '/dashboard/admin', icon: FileText },
  { name: 'User Management', href: '/dashboard/admin/users', icon: Users },
  { name: 'Bookings', href: '/dashboard/admin/bookings', icon: Calendar },
];

const mockApplications = [
  {
    id: '1',
    type: 'pin',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 123-4567',
    submittedAt: '2024-01-10',
    status: 'pending'
  },
  {
    id: '2',
    type: 'csr_rep',
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '(555) 234-5678',
    submittedAt: '2024-01-11',
    status: 'pending'
  },
  {
    id: '3',
    type: 'pin',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '(555) 345-6789',
    submittedAt: '2024-01-09',
    status: 'approved'
  }
];

export default function AdminDashboard() {
  const handleApprove = (id: string, name: string, email: string) => {
    alert(`Approved application for ${name}. Temporary credentials will be sent to ${email}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected application ${id}`);
  };

  const pendingApplications = mockApplications.filter(app => app.status === 'pending');
  const reviewedApplications = mockApplications.filter(app => app.status !== 'pending');

  return (
    <DashboardLayout navigation={navigation} userRole="User Admin">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 md:p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-purple-100">Manage applications and user accounts</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingApplications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Intake Applications</CardTitle>
            <CardDescription>Review and approve new user applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">
                  Pending ({pendingApplications.length})
                </TabsTrigger>
                <TabsTrigger value="reviewed">
                  Reviewed ({reviewedApplications.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingApplications.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No pending applications
                  </div>
                ) : (
                  pendingApplications.map((app) => (
                    <Card key={app.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{app.name}</h3>
                                <Badge variant="outline" className="mt-1">
                                  {app.type === 'pin' ? 'Senior Member' : 'Volunteer'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center text-gray-600">
                                <Mail className="h-4 w-4 mr-2" />
                                {app.email}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2" />
                                {app.phone}
                              </div>
                            </div>

                            <p className="text-sm text-gray-600">
                              Submitted: {new Date(app.submittedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>

                          <div className="flex gap-2 lg:flex-col">
                            <Button 
                              className="flex-1 lg:w-32" 
                              onClick={() => handleApprove(app.id, app.name, app.email)}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 lg:w-32"
                              onClick={() => handleReject(app.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="reviewed" className="space-y-4">
                {reviewedApplications.map((app) => (
                  <Card key={app.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-gray-600">{app.email}</p>
                        </div>
                        <Badge variant={app.status === 'approved' ? 'default' : 'destructive'}>
                          {app.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
