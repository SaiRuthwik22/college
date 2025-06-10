import React, { useState, useEffect } from 'react';
import NewHeader from '@/components/NewHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, MapPin, Clock, Briefcase, Building2, Mail, Phone, CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';
import BackButton from '@/components/HomeButton';
import { useNavigate } from 'react-router-dom';
import InternshipDetails from './InternshipDetails';

interface Banner {
  id: number;
  imageUrls: string;
}

interface BannerResponse {
  id: number;
  urls: Banner[];
}

interface Internship {
  id: number;
  title: string;
  description: string;
  type: string;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  locationType: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  location: string;
  stipend: number;
  duration: string;
}

const InternshipApplication = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [banners, setBanners] = useState<Banner[]>([]);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationType, setLocationType] = useState<string>("all");
  const [internshipType, setInternshipType] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    resumeUrl: ''
  });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://apicollegerepo.lytortech.com/api/admin/internships/get/internship_banners');
        
        if (!response.ok) {
          throw new Error('Failed to fetch internship banners');
        }
        
        const data: BannerResponse = await response.json();
        setBanners(data.urls || []);
      } catch (error) {
        console.error('Error fetching internship banners:', error);
      }
    };

    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://apicollegerepo.lytortech.com/api/admin/internships');
        
        if (!response.ok) {
          throw new Error('Failed to fetch internships');
        }
        
        const data: Internship[] = await response.json();
        setInternships(data);
        setFilteredInternships(data);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast({
          title: "Failed to load internships",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
    fetchInternships();
  }, []);

  const handleApplyFilter = () => {
    let filtered = [...internships];

    if (locationType !== "all") {
      filtered = filtered.filter(internship => {
        if (locationType === "REMOTE") {
          return internship.location.toLowerCase() === "remote";
        } else if (locationType === "ONSITE") {
          return internship.location.toLowerCase() !== "remote";
        }
        return true;
      });
    }

    if (internshipType !== "all") {
      filtered = filtered.filter(internship => internship.type === internshipType);
    }

    if (startDate) {
      filtered = filtered.filter(internship => new Date(internship.startDate) >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(internship => new Date(internship.endDate) <= endDate);
    }

    setFilteredInternships(filtered);
  };

  const resetFilters = () => {
    setLocationType("all");
    setInternshipType("all");
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredInternships(internships);
  };

  const handleOpenApplyDialog = (internship: Internship) => {
    const currentDate = new Date();
    const deadlineDate = new Date(internship.applicationDeadline);

    if (currentDate <= deadlineDate) {
      // Deadline is not passed yet
      if (isLoggedIn) {
        setSelectedInternship(internship);
        setIsApplyOpen(true);
      } else {
        // Redirect to login page
        navigate('/login');
      }
    } else {
      // Deadline has passed, button is disabled in JSX
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!selectedInternship) return;
    
    if (!formData.studentName || !formData.studentEmail || !formData.studentPhone || !formData.resumeUrl) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      const response = await fetch(`https://apicollegerepo.lytortech.com/api/applications/${selectedInternship.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      toast({
        title: "Success",
        description: "Your internship application has been submitted.",
      });
      
      setIsApplyOpen(false);
      setFormData({
        studentName: '',
        studentEmail: '',
        studentPhone: '',
        resumeUrl: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit application. Please try again later.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <BackButton />
      <NewHeader />
      
      {/* Internship Banners Section */}

      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-6 ">Internship Opportunities</h1>
        {banners.length > 0 && (
        <div className="mb-10">
          <div className="w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden relative flex items-center justify-center" style={{background: `url(${banners[0].imageUrls}) center/cover no-repeat`}}>
          </div>
        </div>
      )}
        
        {/* Filters Section */}
        <div className="bg-card rounded-lg border border-border/40 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label>Location Type</Label>
              <Select value={locationType} onValueChange={setLocationType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="ONSITE">Onsite</SelectItem>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Internship Type</Label>
              <Select value={internshipType} onValueChange={setInternshipType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="FULL_TIME">Full Time</SelectItem>
                  <SelectItem value="PART_TIME">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={handleApplyFilter}>
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Internships Grid */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-10 h-10 border-4 border-primary rounded-full border-t-transparent"></div>
          </div>
        ) : filteredInternships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No internships found matching your criteria.</p>
            <Button variant="outline" onClick={resetFilters} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map((internship) => (
              <Card key={internship.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{internship.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{internship.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{internship.providerName}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {internship.location.toLowerCase() === "remote" ? "Remote" : internship.location}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{internship.duration} months</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{internship.type}</span>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-sm font-medium text-muted-foreground">Stipend</div>
                      <div className="text-lg font-semibold">{formatCurrency(internship.stipend)}</div>
                    </div>
                    
                    <div className="pt-2">
                      <div className="text-sm font-medium text-muted-foreground">Application Deadline</div>
                      <div className="text-sm">{formatDate(internship.applicationDeadline)}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-base transition-colors duration-200"
                    onClick={() => navigate(`/internship/${internship.id}`, { state: {
                      id: internship.id,
                      title: internship.title,
                      description: internship.description,
                      locationType: internship.locationType,
                      phone_number: internship.providerPhone,
                      price: internship.stipend,
                      timings: { startDate: internship.startDate, endDate: internship.endDate },
                      count: internship.count ?? null,
                      internship // fallback for full object
                    } })}
                    disabled={new Date() > new Date(internship.applicationDeadline)}
                  >
                    View and Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Application Dialog */}
      <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for Internship</DialogTitle>
            <DialogDescription>
              Please fill in your details to apply for this internship.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Full Name</Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Email</Label>
              <Input
                id="studentEmail"
                name="studentEmail"
                type="email"
                value={formData.studentEmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentPhone">Phone Number</Label>
              <Input
                id="studentPhone"
                name="studentPhone"
                value={formData.studentPhone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleInputChange}
                placeholder="Enter your resume URL"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default InternshipApplication;
