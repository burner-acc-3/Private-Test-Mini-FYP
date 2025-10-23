'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Clock, 
  User,
  Plus,
  Trash2
} from 'lucide-react';

const navigation = [
  { name: 'Assignments', href: '/dashboard/csr', icon: Calendar },
  { name: 'Availability', href: '/dashboard/csr/availability', icon: Clock },
  { name: 'Profile', href: '/dashboard/csr/profile', icon: User },
];

const DAYS_OF_WEEK = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export default function CSRAvailabilityPage() {
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([
    { id: '1', dayOfWeek: 1, startTime: '09:00', endTime: '12:00' },
    { id: '2', dayOfWeek: 3, startTime: '14:00', endTime: '17:00' },
    { id: '3', dayOfWeek: 5, startTime: '10:00', endTime: '15:00' }
  ]);

  const [newSlot, setNewSlot] = useState({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '17:00'
  });

  const addSlot = () => {
    const slot: AvailabilitySlot = {
      id: Date.now().toString(),
      ...newSlot
    };
    setAvailabilitySlots([...availabilitySlots, slot]);
  };

  const removeSlot = (id: string) => {
    setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== id));
  };

  const groupedSlots = DAYS_OF_WEEK.map((day, index) => ({
    day,
    dayIndex: index,
    slots: availabilitySlots.filter(slot => slot.dayOfWeek === index)
  }));

  return (
    <DashboardLayout navigation={navigation} userRole="Volunteer">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Availability</h1>
          <p className="text-gray-600">Set your available times for volunteering</p>
        </div>

        {/* Add New Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Add Availability</CardTitle>
            <CardDescription>Create a new time slot when you're available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Day of Week</Label>
                <Select 
                  value={newSlot.dayOfWeek.toString()} 
                  onValueChange={(value) => setNewSlot({...newSlot, dayOfWeek: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Time</Label>
                <Select 
                  value={newSlot.startTime} 
                  onValueChange={(value) => setNewSlot({...newSlot, startTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>End Time</Label>
                <Select 
                  value={newSlot.endTime} 
                  onValueChange={(value) => setNewSlot({...newSlot, endTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button onClick={addSlot} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Slot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Your Availability Schedule</CardTitle>
            <CardDescription>Your current available time slots</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {groupedSlots.map(({ day, dayIndex, slots }) => (
                <div key={dayIndex} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold text-lg mb-3">{day}</h3>
                  {slots.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No availability set</p>
                  ) : (
                    <div className="space-y-2">
                      {slots.map((slot) => (
                        <div 
                          key={slot.id} 
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSlot(slot.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Hours/Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {availabilitySlots.reduce((total, slot) => {
                  const start = parseInt(slot.startTime.split(':')[0]);
                  const end = parseInt(slot.endTime.split(':')[0]);
                  return total + (end - start);
                }, 0)} hours
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Available Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(availabilitySlots.map(s => s.dayOfWeek)).size} days
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Time Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availabilitySlots.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
