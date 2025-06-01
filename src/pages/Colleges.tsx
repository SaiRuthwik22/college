import React, { useState, useEffect } from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { College as MockCollege, mockColleges } from '@/data/mockColleges';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import HomeButton from '@/components/HomeButton';
import { Download, ExternalLink, Filter, X } from 'lucide-react';
import '@/styles/custom.css';
import FilterModal from '@/components/FilterModal';

interface College {
  id: number | string;  // Updated to accept both number and string
  name: string;
  collegeCode?: string;
  universityAffiliation?: string;
  accreditation?: string;
  type?: string;
  location?: string;
  tier?: string;
  registration?: string;
  recommended?: string;
  yearOfEstablishment?: number;
  officialWebsite?: string;
  image?: string;
  url?: string;
  urls?: { id: number; imageUrls: string }[];
  description?: string;
  // For backward compatibility with mockColleges
  code?: string;
  images?: string[];
  tuitionFee?: string;
  ranking?: string;
  rating?: number;
  brochure?: string;
}

interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}

interface PagedResponse {
  content: College[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
}

const COLLEGES_CACHE_KEY = 'eduportal_colleges_cache';
const COLLEGES_CACHE_TIME = 10 * 60 * 1000; // 10 minutes

const Colleges = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredArr, setFilteredArr] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    pageNumber: 0,
    pageSize: 9,
    totalPages: 0,
    totalElements: 0
  });
  
  // Filter states
  const [tier, setTier] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [recommended, setRecommended] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState(false);
  
  const [searchResults, setSearchResults] = useState<College[]>([]);
  
  useEffect(() => {
    // On mount, restore from cache if state is empty (e.g., after back navigation)
    if (colleges.length === 0 || filteredArr.length === 0) {
      const cache = localStorage.getItem(COLLEGES_CACHE_KEY);
      if (cache) {
        const { data, timestamp } = JSON.parse(cache);
        if (Date.now() - timestamp < COLLEGES_CACHE_TIME) {
          setColleges(data.content);
          setFilteredArr(data.content);
          setPagination({
            pageNumber: 0,
            pageSize: 9,
            totalPages: Math.ceil(data.content.length / 9),
            totalElements: data.content.length
          });
          setLoading(false);
          return;
        }
      }
      fetchColleges();
    }
    // Optionally, listen for page visibility changes (for SPA navigation)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        if (colleges.length === 0 || filteredArr.length === 0) {
          const cache = localStorage.getItem(COLLEGES_CACHE_KEY);
          if (cache) {
            const { data, timestamp } = JSON.parse(cache);
            if (Date.now() - timestamp < COLLEGES_CACHE_TIME) {
              setColleges(data.content);
              setFilteredArr(data.content);
              setPagination({
                pageNumber: 0,
                pageSize: 9,
                totalPages: Math.ceil(data.content.length / 9),
                totalElements: data.content.length
              });
              setLoading(false);
            }
          }
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);
  
  const fetchColleges = async () => {
    let url = `https://apicollegerepo.lytortech.com/api/v1/colleges/filter?page=0&size=1000`;
    // Fetch all for client-side filtering
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch colleges: ${response.status}`);
      }
      const data: PagedResponse = await response.json();
      setColleges(data.content);
      setFilteredArr(data.content);
      setPagination({
        pageNumber: 0,
        pageSize: 9,
        totalPages: Math.ceil(data.content.length / 9),
        totalElements: data.content.length
      });
      localStorage.setItem(COLLEGES_CACHE_KEY, JSON.stringify({ data: { ...data, content: data.content }, timestamp: Date.now() }));
    } catch (error) {
      setColleges(mockColleges as unknown as College[]);
      setFilteredArr(mockColleges as unknown as College[]);
      setPagination({
        pageNumber: 0,
        pageSize: mockColleges.length,
        totalPages: 1,
        totalElements: mockColleges.length
      });
    } finally {
      setLoading(false);
    }
  };
  
  const applyClientFilters = () => {
    let arr = [...colleges];
    if (tier && tier !== 'all' && tier !== '') arr = arr.filter(c => c.tier === tier);
    if (type && type !== 'all' && type !== '') arr = arr.filter(c => c.type === type);
    if (recommended && recommended !== 'all' && recommended !== '') arr = arr.filter(c => c.recommended === recommended);
    if (location && location.trim() !== '') arr = arr.filter(c => c.location && c.location.toLowerCase().includes(location.toLowerCase()));
    setFilteredArr(arr);
    setPagination({
      pageNumber: 0,
      pageSize: 9,
      totalPages: Math.ceil(arr.length / 9),
      totalElements: arr.length
    });
  };
  
  const handleApplyFilters = () => {
    applyClientFilters();
    setFilterOpen(false);
  };
  
  const handleResetFilters = () => {
    setTier("");
    setType("");
    setRecommended("");
    setLocation("");
    setFilteredArr(colleges);
    setPagination({
      pageNumber: 0,
      pageSize: 9,
      totalPages: Math.ceil(colleges.length / 9),
      totalElements: colleges.length
    });
  };
  
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination(prev => ({
        ...prev,
        pageNumber: newPage
      }));
    }
  };

  const handleCollegeClick = async (college: College) => {
    const collegeCode = college.collegeCode || college.code;
    if (collegeCode) {
      try {
        setLoading(true);
        const response = await fetch(`https://apicollegerepo.lytortech.com/admin/get/all_college_details/${collegeCode}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch college details: ${response.status}`);
        }
        
        const collegeDetails = await response.json();
        console.log(collegeDetails);
        navigate(`/college/${collegeCode}`, { state: { collegeDetails } });
      } catch (error) {
        console.error("Error fetching college details:", error);
        toast({
          title: "Failed to load college details",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "Cannot view college details",
        description: "College code is missing",
        variant: "destructive"
      });
    }
  };
  
  // Filter controls for modal
  const filterContent = (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block text-text-light">Tier</label>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="bg-surface">
            <SelectValue placeholder="Select tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="Tier 1">Tier 1</SelectItem>
            <SelectItem value="Tier 2">Tier 2</SelectItem>
            <SelectItem value="Tier 3">Tier 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block text-text-light">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="bg-surface">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Engineering">Engineering</SelectItem>
            <SelectItem value="Medical">Medical</SelectItem>
            <SelectItem value="Arts">Arts</SelectItem>
            <SelectItem value="Management">Management</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block text-text-light">Recommended</label>
        <Select value={recommended} onValueChange={setRecommended}>
          <SelectTrigger className="bg-surface">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Yes">Recommended</SelectItem>
            <SelectItem value="No">Not Recommended</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block text-text-light">Location</label>
        <Input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-surface"
        />
      </div>
      <div className="flex gap-2 justify-end mt-4">
        <Button
          variant="outline"
          onClick={handleResetFilters}
          className="border-secondary text-secondary hover:bg-secondary/10"
        >
          Reset
        </Button>
        <Button
          onClick={handleApplyFilters}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );

  const paginatedArr = filteredArr.slice(pagination.pageNumber * pagination.pageSize, (pagination.pageNumber + 1) * pagination.pageSize);

  // Search handler for SearchBar
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    // Filter by name (case-insensitive, partial match)
    const results = colleges.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    setSearchResults(results);
  };

  // When a dropdown result is clicked
  const handleResultClick = (college: College) => {
    handleCollegeClick(college);
  };

  // Render a dropdown result
  const renderResult = (college: College) => (
    <>
      <div className="w-8 h-8 rounded-md overflow-hidden border border-border mr-2">
        <img
          src={college.image || college.urls?.[0]?.imageUrls || '/placeholder-college.jpg'}
          alt={college.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium text-foreground">{college.name}</p>
        <p className="text-xs text-muted-foreground">{college.location}</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <NewHeader />
      <main className="container mx-auto mt-12 px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center mb-8 gap-4 w-full">
          <h1 className="text-3xl font-display font-bold  whitespace-nowrap mr-4">Explore Colleges</h1>
          <div className="flex-1 flex items-center gap-2 w-full">
            <SearchBar 
              className="flex-1 min-w-0" 
              filterOpen={filterOpen} 
              setFilterOpen={setFilterOpen}
              onSearch={handleSearch}
              results={searchResults}
              onResultClick={handleResultClick}
              renderResult={renderResult}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedArr.map((college, index) => {
                  const hasBrochure = Boolean(college.brochure);
                  return (
                    <Card
                      key={college.id}
                      className="transition-all border border-surface rounded-xl shadow-sm bg-white flex flex-col h-full"
                    >
                      <CardHeader className="relative p-0">
                        <div className="aspect-video relative overflow-hidden rounded-t-xl">
                          <img
                            src={college.image || college.urls?.[0]?.imageUrls || '/placeholder-college.jpg'}
                            alt={college.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <CardTitle className="text-xl font-bold text-primary mb-1 line-clamp-2">{college.name}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {college.tier && <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">{college.tier}</span>}
                            {college.type && <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-semibold">{college.type}</span>}
                            {college.recommended === 'Yes' && <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-semibold">Recommended</span>}
                          </div>
                          <div className="text-sm text-secondary mb-2">
                            {college.universityAffiliation && <div><span className="font-medium">Affiliation:</span> {college.universityAffiliation}</div>}
                            {college.accreditation && <div><span className="font-medium">Accreditation:</span> {college.accreditation}</div>}
                            {college.location && <div><span className="font-medium">Location:</span> {college.location}</div>}
                            {college.yearOfEstablishment && <div><span className="font-medium">Established:</span> {college.yearOfEstablishment}</div>}
                            {college.registration && <div><span className="font-medium">Registration:</span> {college.registration}</div>}
                          </div>
                          {college.officialWebsite && (
                            <a
                              href={college.officialWebsite}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-primary hover:underline text-sm mb-2"
                            >
                              <ExternalLink size={16} /> Official Website
                            </a>
                          )}
                        </div>
                      </CardHeader>
                      <div className="flex-1"></div>
                      <CardFooter className="flex justify-between items-center p-4 border-t border-surface mt-auto">
                        <Button
                          variant="outline"
                          onClick={() => handleCollegeClick(college)}
                          className="border-primary text-primary hover:bg-primary hover:text-white transition-all"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={
                            hasBrochure
                              ? 'text-accent hover:bg-accent/10 hover:text-accent border border-accent'
                              : 'text-secondary bg-surface border border-surface cursor-not-allowed opacity-60'
                          }
                          onClick={() => hasBrochure && window.open(college.brochure, '_blank')}
                          disabled={!hasBrochure}
                          title={hasBrochure ? 'Download Brochure' : 'No Brochure Available'}
                        >
                          <Download className="h-5 w-5" />
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
            {!loading && filteredArr.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold text-text-light mb-2">No colleges found</h3>
                <p className="text-secondary">Try adjusting your filters or search criteria</p>
              </div>
            )}
            {!loading && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center animate-fade-in">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                        className={pagination.pageNumber === 0 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          onClick={() => handlePageChange(i)}
                          isActive={pagination.pageNumber === i}
                          className={pagination.pageNumber === i ? 'bg-primary text-white rounded' : ''}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                        className={pagination.pageNumber === pagination.totalPages - 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="bg-secondary text-white">
        <Footer />
      </div>
      <FilterModal open={filterOpen} onOpenChange={setFilterOpen}>
        {filterContent}
      </FilterModal>
    </div>
  );
};

export default Colleges;
