import { Service } from '@/types';

export const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Grocery Shopping Assistance',
    description: 'Help with grocery shopping, including transportation, selecting items, and carrying bags.',
    category: 'Daily Living',
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80'
  },
  {
    id: '2',
    name: 'Medical Appointment Companion',
    description: 'Accompany to medical appointments, help with paperwork, and take notes.',
    category: 'Healthcare',
    duration: 180,
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
  },
  {
    id: '3',
    name: 'Technology Support',
    description: 'Assistance with smartphones, computers, video calls, and online services.',
    category: 'Technology',
    duration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
  },
  {
    id: '4',
    name: 'Home Maintenance Help',
    description: 'Light household tasks like changing bulbs, minor repairs, and organizing.',
    category: 'Home Care',
    duration: 120,
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80'
  },
  {
    id: '5',
    name: 'Social Companionship',
    description: 'Friendly visits, conversation, games, and social activities.',
    category: 'Social',
    duration: 60,
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80'
  },
  {
    id: '6',
    name: 'Meal Preparation',
    description: 'Help with meal planning, cooking, and kitchen cleanup.',
    category: 'Daily Living',
    duration: 90,
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'
  }
];

export const SERVICE_CATEGORIES = [
  'All Services',
  'Daily Living',
  'Healthcare',
  'Technology',
  'Home Care',
  'Social'
];

export const LANGUAGES = [
  'English',
  'French',
  'Spanish',
  'Mandarin',
  'Cantonese',
  'Punjabi',
  'Tagalog',
  'Arabic'
];
