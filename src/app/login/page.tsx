'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - route based on email pattern
    if (email.includes('pin')) {
      router.push('/dashboard/pin');
    } else if (email.includes('volunteer') || email.includes('csr')) {
      router.push('/dashboard/csr');
    } else if (email.includes('admin')) {
      router.push('/dashboard/admin');
    } else if (email.includes('manager')) {
      router.push('/dashboard/manager');
    } else {
      // Default to PIN dashboard
      router.push('/dashboard/pin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">Limbo</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">Don't have an account?</p>
              <div className="flex gap-2 justify-center">
                <Link href="/intake/pin" className="text-blue-600 hover:underline">
                  Apply for Services
                </Link>
                <span>or</span>
                <Link href="/intake/volunteer" className="text-blue-600 hover:underline">
                  Volunteer
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
