
export interface College {
  id: string;
  name: string;
  location: string;
  description: string;
  programs: string[];
  ranking: string;
  founded: string;
  students: string;
  accreditation: string;
  images: string[];
  rating: number;
  code: string;
  tuitionFee: string;
  acceptance: string;
  facilities: string[];
}

export const mockColleges: College[] = [
  {
    id: "1",
    name: "Stanford University",
    location: "Stanford, California",
    description: "A world-renowned private research university with a strong focus on innovation, entrepreneurship, and academic excellence across multiple disciplines.",
    programs: ["Computer Science", "Business Administration", "Engineering", "Medicine", "Law", "Humanities"],
    ranking: "#6 in National Universities",
    founded: "1885",
    students: "16,937",
    accreditation: "Western Association of Schools and Colleges",
    images: [
      'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581362007132-a3e1e5259285?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581362743042-09a21a2462f3?q=80&w=2574&auto=format&fit=crop',
    ],
    rating: 4.8,
    code: "SU1885",
    tuitionFee: "$56,169 per year",
    acceptance: "4%",
    facilities: ["Libraries", "Research Labs", "Recreation Centers", "Student Housing", "Medical Center"]
  },
  {
    id: "2",
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    description: "America's oldest institution of higher learning and a leader in education since 1636, known for its unparalleled academic programs and distinguished faculty.",
    programs: ["Business", "Law", "Medicine", "Arts and Sciences", "Education", "Public Health"],
    ranking: "#2 in National Universities",
    founded: "1636",
    students: "23,731",
    accreditation: "New England Commission of Higher Education",
    images: [
      'https://images.unsplash.com/photo-1559135197-8a45ea74d367?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580461793876-692a3351cfa5?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590761499236-018e2d740fed?q=80&w=2574&auto=format&fit=crop',
    ],
    rating: 4.9,
    code: "HU1636",
    tuitionFee: "$51,925 per year",
    acceptance: "5%",
    facilities: ["Libraries", "Research Centers", "Athletic Facilities", "Museums", "Innovation Labs"]
  },
  {
    id: "3",
    name: "MIT",
    location: "Cambridge, Massachusetts",
    description: "A prestigious private research university focused on science, engineering, and technology, nurturing innovation and technical excellence.",
    programs: ["Engineering", "Computer Science", "Physics", "Mathematics", "Business", "Architecture"],
    ranking: "#1 in Engineering",
    founded: "1861",
    students: "11,376",
    accreditation: "New England Commission of Higher Education",
    images: [
      'https://images.unsplash.com/photo-1564807074841-4b16a3252dba?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584385150747-8b86833285a3?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584384158128-ab58424d7b77?q=80&w=1974&auto=format&fit=crop',
    ],
    rating: 4.9,
    code: "MIT1861",
    tuitionFee: "$55,510 per year",
    acceptance: "7%",
    facilities: ["Research Labs", "Innovation Hubs", "Libraries", "Student Housing", "Recreation Centers"]
  },
  {
    id: "4",
    name: "Yale University",
    location: "New Haven, Connecticut",
    description: "An Ivy League research university committed to improving the world through outstanding education, scholarship, and cultural heritage preservation.",
    programs: ["Law", "Medicine", "Business", "Arts and Sciences", "Environment", "Drama"],
    ranking: "#5 in National Universities",
    founded: "1701",
    students: "13,609",
    accreditation: "New England Commission of Higher Education",
    images: [
      'https://images.unsplash.com/photo-1582749551783-0d0f26b11eb3?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584384321443-beccd345dec8?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577070897966-fb1a651518e3?q=80&w=1974&auto=format&fit=crop',
    ],
    rating: 4.7,
    code: "YU1701",
    tuitionFee: "$59,950 per year",
    acceptance: "6.1%",
    facilities: ["Libraries", "Museums", "Theaters", "Research Centers", "Athletic Facilities"]
  },
  {
    id: "5",
    name: "University of California, Berkeley",
    location: "Berkeley, California",
    description: "A public research university that stands among the world's leading institutions of higher education, known for its academic excellence and pioneering research.",
    programs: ["Computer Science", "Engineering", "Business", "Environmental Sciences", "Social Sciences", "Humanities"],
    ranking: "#22 in National Universities",
    founded: "1868",
    students: "43,185",
    accreditation: "Western Association of Schools and Colleges",
    images: [
      'https://images.unsplash.com/photo-1580461392292-bab780ef2593?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610629789131-1dfa7affbd33?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520256721209-c0eb8977508b?q=80&w=1974&auto=format&fit=crop',
    ],
    rating: 4.6,
    code: "UCB1868",
    tuitionFee: "$14,254 in-state, $44,008 out-of-state",
    acceptance: "16%",
    facilities: ["Libraries", "Research Centers", "Student Union", "Recreation Facilities", "Museums"]
  },
  {
    id: "6",
    name: "Princeton University",
    location: "Princeton, New Jersey",
    description: "An Ivy League university with a strong emphasis on undergraduate education, cutting-edge research, and a commitment to service.",
    programs: ["Engineering", "Public Affairs", "Arts and Sciences", "Architecture", "Finance", "International Relations"],
    ranking: "#1 in National Universities",
    founded: "1746",
    students: "8,279",
    accreditation: "Middle States Commission on Higher Education",
    images: [
      'https://images.unsplash.com/photo-1569863729233-ddd3d59e0afa?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590261857099-9accecd8f1b8?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587912758619-883645a4c683?q=80&w=1974&auto=format&fit=crop',
    ],
    rating: 4.9,
    code: "PU1746",
    tuitionFee: "$57,410 per year",
    acceptance: "5.8%",
    facilities: ["Libraries", "Research Centers", "Art Museum", "Athletics Facilities", "Performance Venues"]
  }
];

// For comparison feature
export const getComparisonColleges = (currentCollegeId: string) => {
  return mockColleges.filter(college => college.id !== currentCollegeId);
};
