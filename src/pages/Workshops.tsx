import React, { useState, useEffect } from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Clock, Calendar as CalendarIcon2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface WorkshopBanner {
  id: number;
  url: string;
}

interface Workshop {
  id: number;
  title: string;
  description: string;
  conductor: string;
  location: string;
  phone_number: string;
  price: number;
  timings: string;
  startDate: string;
  endDate: string;
  count: number;
}

interface WorkshopBannerResponse {
  id: number;
  urls: WorkshopBanner[];
}

const Workshops = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [banners, setBanners] = useState<WorkshopBanner[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const [openRegistration, setOpenRegistration] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [form, setForm] = useState({
    participantName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://apicollegerepo.lytortech.com/api/admin/workshops/get/workshop_banners');
        if (!response.ok) throw new Error('Failed to fetch workshop banners');
        const data = await response.json();
        // Flatten all imageUrls from all banner objects
        const allBanners = (Array.isArray(data.urls) ? data.urls : []).flatMap(b => b.imageUrls ? [{ id: b.id, url: b.imageUrls }] : []);
        setBanners(allBanners);
      } catch (err) {
        setError('Failed to load workshop banners');
      }
    };

    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://apicollegerepo.lytortech.com/api/admin/workshops/all/workshops');
        
        if (!response.ok) {
          throw new Error('Failed to fetch workshops');
        }
        
        const data: Workshop[] = await response.json();
        setWorkshops(data);
        setFilteredWorkshops(data);
      } catch (err) {
        console.error('Error fetching workshops:', err);
        setError('Failed to load workshops');
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
    fetchWorkshops();
  }, []);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Missing dates",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }

    const formattedStartDate = startDate.toISOString();
    const formattedEndDate = endDate.toISOString();
    const locationParam = location ? `&location=${encodeURIComponent(location)}` : '';

    try {
      setLoading(true);
      const response = await fetch(
        `https://apicollegerepo.lytortech.com/api/admin/workshops/get/workshops_date?startDate=${formattedStartDate}&endDate=${formattedEndDate}${locationParam}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch filtered workshops');
      }
      
      const data: Workshop[] = await response.json();
      setFilteredWorkshops(data);
      
      if (data.length === 0) {
        toast({
          title: "No workshops found",
          description: "Try different filter criteria",
        });
      }
    } catch (err) {
      console.error('Error fetching filtered workshops:', err);
      toast({
        title: "Filter failed",
        description: "Could not apply filters, showing all workshops",
        variant: "destructive"
      });
      setFilteredWorkshops(workshops);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setLocation("");
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredWorkshops(workshops);
  };

  const handleRegister = (workshop: Workshop) => {
    const currentDate = new Date();
    const workshopStartDate = new Date(workshop.startDate);

    if (currentDate <= workshopStartDate) {
      // Check if user is logged in
      if (isLoggedIn) {
        setSelectedWorkshop(workshop);
        setOpenRegistration(true);
      } else {
        // Redirect to login page
        navigate('/login');
      }
    } else {
      // Workshop has already started or finished, button should be disabled
      // This part is handled in the JSX render
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = async () => {
    if (!selectedWorkshop) return;

    // Validate form
    if (!form.participantName || !form.email || !form.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('https://apicollegerepo.lytortech.com/api/admin/workshops/save/workshop_form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantName: form.participantName,
          email: form.email,
          phone: form.phone,
          workshopId: selectedWorkshop.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      toast({
        title: "Registration successful",
        description: `You are registered for ${selectedWorkshop.title}`,
      });

      setOpenRegistration(false);
      setForm({
        participantName: '',
        email: '',
        phone: '',
      });
    } catch (err) {
      console.error('Error submitting registration:', err);
      toast({
        title: "Registration failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP'); // '01/01/2021'
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <NewHeader />
      
      <main className="container mx-auto mt-20 px-4 py-8 animate-fade-in">
        <h1 className="text-3xl font-display font-bold mb-6">Workshops & Events</h1>
        
        {/* Banners */}
        {banners.length > 0 && (
          <div className="mb-10">
            <div className="w-full h-[320px] md:h-[400px] rounded-lg overflow-hidden relative flex items-center justify-center" style={{background: `url(${banners[0].url}) center/cover no-repeat`}}>
              {/* No overlay, no text */}
            </div>
          </div>
        )}
        
        {/* Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Find Workshops</CardTitle>
              <CardDescription>Filter workshops by location and date range</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    placeholder="e.g. Hyderabad" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {startDate ? format(startDate, 'PPP') : (
                          <span className="text-muted-foreground">Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex-1">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left"
                      >
                        {endDate ? format(endDate, 'PPP') : (
                          <span className="text-muted-foreground">Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button onClick={handleFilter}>
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Workshops List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <Card key={workshop.id} className="h-full flex flex-col bg-surface border border-border">
                <CardHeader>
                  <CardTitle>{workshop.title}</CardTitle>
                  <CardDescription>by {workshop.conductor}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">{workshop.description}</p>
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{workshop.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{workshop.timings}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{formatDate(workshop.startDate)} to {formatDate(workshop.endDate)}</span>
                    </div>
                    <div className="text-sm font-medium mt-2">
                      Price: ₹{workshop.price.toLocaleString()}
                    </div>
                    {workshop.count > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Available seats: {workshop.count}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors" 
                    onClick={() => handleRegister(workshop)}
                    disabled={new Date() > new Date(workshop.startDate)}
                  >
                    Book
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {filteredWorkshops.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No workshops found with the current filters.</p>
            <Button onClick={resetFilters}>Clear Filters</Button>
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Registration Dialog */}
      <Dialog open={openRegistration} onOpenChange={setOpenRegistration}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register for Workshop</DialogTitle>
            <DialogDescription>
              {selectedWorkshop?.title} - {selectedWorkshop?.location}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="participantName"
                value={form.participantName}
                onChange={handleFormChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Enter your email"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleFormChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenRegistration(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitRegistration}>
              Complete Registration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workshops;
