export type UserRole = 'pin' | 'csr_rep' | 'user_admin' | 'platform_manager';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
}

export interface PINProfile extends User {
  role: 'pin';
  address: string;
  city: string;
  postalCode: string;
  languages: string[];
  emergencyContact: string;
  emergencyPhone: string;
  medicalNotes?: string;
  favoriteServices: string[];
  favoriteVolunteers: string[];
}

export interface CSRProfile extends User {
  role: 'csr_rep';
  address: string;
  city: string;
  postalCode: string;
  languages: string[];
  services: string[];
  availability: AvailabilitySlot[];
  maxRadius: number; // in km
  bio?: string;
  rating?: number;
}

export interface AvailabilitySlot {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  imageUrl?: string;
}

export interface Booking {
  id: string;
  pinId: string;
  csrRepId?: string;
  serviceId: string;
  requestedDate: string;
  requestedTime: string;
  status: 'pending' | 'matched' | 'confirmed' | 'completed' | 'cancelled' | 'no_match';
  notes?: string;
  createdAt: string;
  matchedAt?: string;
  confirmedAt?: string;
}

export interface IntakeApplication {
  id: string;
  type: 'pin' | 'csr_rep';
  status: 'pending' | 'approved' | 'rejected';
  data: Partial<PINProfile | CSRProfile>;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}
