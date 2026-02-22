import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star, Ribbon, Heart, ShieldCheck, type LucideIcon } from 'lucide-react';

export interface Product {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: ImagePlaceholder;
  details: {
    keyFeatures: string[];
    coverage: { title: string; description: string }[];
    eligibility: string;
  };
}

const getImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Fallback image if not found
    return {
      id: 'fallback',
      description: 'A generic placeholder image.',
      imageUrl: 'https://picsum.photos/seed/fallback/600/400',
      imageHint: 'placeholder',
    };
  }
  return image;
};

export const products: Product[] = [
  {
    slug: 'super-star-health-insurance',
    name: 'Super Star Health Insurance',
    description: 'A premium health policy with flexible add-ons, offering unlimited restoration, loyalty bonuses, and unique benefits.',
    icon: Star,
    image: getImage('super-star-health-insurance'),
    details: {
      keyFeatures: [
        'Unlimited automatic restoration of sum insured.',
        'No Claim Bonus up to 100% of sum insured.',
        'Annual health check-ups for all insured members.',
        'Cover for modern treatments and procedures.',
      ],
      coverage: [
        {
          title: 'Hospitalization',
          description: 'Covers room rent, nursing expenses, ICU charges, and surgeon’s fees.',
        },
        {
          title: 'Pre & Post Hospitalization',
          description: 'Covers medical expenses for 60 days before and 90 days after hospitalization.',
        },
        {
          title: 'Day Care Procedures',
          description: 'Covers all day care procedures that require less than 24 hours of hospitalization.',
        },
      ],
      eligibility: 'Entry age from 18 to 65 years. Dependent children can be covered from 91 days to 25 years.',
    },
  },
  {
    slug: 'cancer-care-platinum',
    name: 'Cancer Care Platinum',
    description: 'A dedicated insurance policy for individuals diagnosed with cancer, offering indemnity and lumpsum benefits.',
    icon: Ribbon,
    image: getImage('cancer-care-platinum'),
    details: {
      keyFeatures: [
        'Lump sum benefit on first diagnosis of specified cancer stages.',
        'Indemnity cover for hospitalization expenses.',
        'No pre-policy medical check-up required.',
        'Waiver of premium for one year upon diagnosis.',
      ],
      coverage: [
        {
          title: 'Lump Sum Payout',
          description: 'Provides a one-time lump sum payment on the diagnosis of early, major, or advanced stage cancer.',
        },
        {
          title: 'Indemnity Coverage',
          description: 'Covers costs of chemotherapy, radiotherapy, and other related cancer treatments.',
        },
        {
          title: 'Surgical Oncology',
          description: 'Includes coverage for cancer-related surgeries and procedures.',
        },
      ],
      eligibility: 'Entry age from 5 months to 65 years. Available for individuals who have been diagnosed with Stage 1 or Stage 2 cancer.',
    },
  },
  {
    slug: 'star-women-care',
    name: 'Star Women Care Insurance',
    description: 'An exclusive health product for women and their families, covering hospitalization and maternity benefits.',
    icon: Heart,
    image: getImage('star-women-care'),
    details: {
      keyFeatures: [
        'Specifically designed for women.',
        'Covers maternity expenses (pre-natal and post-natal).',
        'Cover for newborn baby expenses.',
        'Personal accident cover against death or permanent total disablement.',
      ],
      coverage: [
        {
          title: 'Maternity Cover',
          description: 'Includes expenses for normal and caesarean delivery.',
        },
        {
          title: 'Newborn Baby Cover',
          description: 'Covers medical expenses for the newborn from day one.',
        },
        {
          title: 'Wellness Benefits',
          description: 'Includes regular health check-ups and preventive care for women.',
        },
      ],
      eligibility: 'Entry age for adult females from 18 to 75 years. Can be taken as an individual or floater policy to include family.',
    },
  },
  {
    slug: 'star-health-assure',
    name: 'Star Health Assure Insurance',
    description: 'A comprehensive plan covering hospitalization for illnesses and accidental injuries with both Individual and Floater options.',
    icon: ShieldCheck,
    image: getImage('star-health-assure'),
    details: {
      keyFeatures: [
        'Guaranteed lifelong renewability.',
        'No cap on room rent or treatment costs.',
        'Discount of 5% for choosing a 2-year policy term.',
        'No pre-policy medical check-up for individuals up to 50 years old.',
      ],
      coverage: [
        {
          title: 'In-patient Hospitalization',
          description: 'Covers expenses if you are hospitalized for more than 24 hours.',
        },
        {
          title: 'Accidental Death & Disablement',
          description: 'Provides a lump sum amount in case of accidental death or permanent disability.',
        },
        {
          title: 'Organ Donor Expenses',
          description: 'Covers the medical expenses incurred by the organ donor for organ transplantation.',
        },
      ],
      eligibility: 'Entry age from 18 to 75 years. Floater option available to cover spouse and dependent children.',
    },
  },
];
