
/// <reference types="vite/client" />

// Global College type that works with both API and mock data
interface CommonCollege {
  id: number | string;
  name: string;
  collegeCode?: string;
  universityAffiliation?: string;
  accreditation?: string;
  type?: string;
  location?: string;
  tier?: string;
  registration?: string;
  recommended?: string;
  // Mock data fields
  code?: string;
  images?: string[];
  description?: string;
  tuitionFee?: string;
  rating?: number;
  // API specific fields
  yearOfEstablishment?: number;
  officialWebsite?: string;
  image?: string;
  url?: string;
  urls?: { id: number; url: string }[];
  brocher?: string;
}
