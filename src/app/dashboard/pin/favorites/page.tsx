'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Calendar, 
  Heart,
  Clock,
  Trash2
} from 'lucide-react';
import { MOCK_SERVICES } from '@/lib/mock-data';

const navigation = [
  { name: 'Search Services', href: '/dashboard/pin', icon: Search },
  { name: 'My Bookings', href: '/dashboard/pin/bookings', icon: Calendar },
  { name: 'Favorites', href: '/dashboard/pin/favorites', icon: Heart },
];

export default function PINFavoritesPage() {
  // Mock favorite service IDs
  const [favoriteServiceIds, setFavoriteServiceIds] = useState<string[]>(['1', '2', '5']);
  
  const favoriteServices = MOCK_SERVICES.filter(service => 
    favoriteServiceIds.includes(service.id)
  );

  const removeFavorite = (serviceId: string) => {
    setFavoriteServiceIds(prev => prev.filter(id => id !== serviceId));
  };

  return (
    <DashboardLayout navigation={navigation} userRole="Senior Member">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Favorite Services</h1>
          <p className="text-gray-600">Quick access to your saved services</p>
        </div>

        {favoriteServices.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No favorite services yet</p>
              <Button onClick={() => window.location.href = '/dashboard/pin'}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteServices.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3"
                    onClick={() => removeFavorite(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{service.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration} min
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                  <Button className="w-full">
                    Book This Service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
