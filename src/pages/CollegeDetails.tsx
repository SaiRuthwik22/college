import React, { useState, useEffect } from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, X, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { logCollegeView, logCollegeClick } from '@/lib/analytics';
import { v4 as uuidv4 } from 'uuid';
import BackButton from '@/components/HomeButton';

interface CollegeDetails {
  collegeCode: string;
  criteria: string;
  cutoffRank: number;
  roundNumber: number;
  managementFees: number;
  email: string;
  phone: string;
  googleMapsLink: string;
  address: string;
  name: string;
  level: string;
  specialization: string;
  totalSeats: number;
  lateralEntryAvailable: boolean;
  wifi: boolean;
  library: boolean;
  hostel: boolean;
  canteen: boolean;
  gym: boolean;
  sports: boolean;
  medicalFacilities: boolean;
  year: number;
  placementPercentage: number;
  highestPackage: number;
  averagePackage: number;
  topRecruiters: string;
  category: string;
  seatsAvailable: number;
}

const CollegeDetails = () => {
  const { collegeCode } = useParams<{ collegeCode: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [collegeDetails, setCollegeDetails] = useState<CollegeDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Generate a temporary user ID for anonymous tracking
  const [tempUserId] = useState(() => localStorage.getItem('tempUserId') || uuidv4());

  useEffect(() => {
    // Store temp user ID in localStorage if not already present
    if (!localStorage.getItem('tempUserId')) {
      localStorage.setItem('tempUserId', tempUserId);
    }
    
    const fetchCollegeDetails = async () => {
      if (!collegeCode) {
        setError("College code is required");
        setLoading(false);
        return;
      }

      // Check if we have college details in the location state
      if (location.state?.collegeDetails) {
        setCollegeDetails(location.state.collegeDetails);
        setLoading(false);
        
        // Log college view when data is loaded
        logCollegeView({
          collegeId: collegeCode,
          userId: localStorage.getItem('userId') || tempUserId,
        });
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://apicollegerepo.lytortech.com/get/all_college_details/${collegeCode}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch college details. Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCollegeDetails(data);
        
        // Log college view when data is loaded
        logCollegeView({
          collegeId: collegeCode,
          userId: localStorage.getItem('userId') || tempUserId,
        });
      } catch (err) {
        console.error('Error fetching college details:', err);
        setError("Could not load college details. Please try again later.");
        toast({
          title: "Error",
          description: "Failed to load college details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCollegeDetails();
  }, [collegeCode, tempUserId, location.state]);
  
  // Log college click when user clicks "Apply Now" button
  const handleApplyClick = () => {
    if (collegeCode) {
      logCollegeClick({
        collegeId: collegeCode,
        userId: localStorage.getItem('userId') || tempUserId,
      });
      
      toast({
        title: "Application Started",
        description: "Please complete the application form to proceed.",
      });
      
      // Redirect to application form or show dialog
      // This is a placeholder - you might want to implement a different flow
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-background">
        <NewHeader />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground">Loading college details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !collegeDetails) {
    return (
      <div className="min-h-screen w-full flex flex-col bg-background">
        <NewHeader />
        <div className="flex-1 flex items-center justify-center mt-16">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p className="text-muted-foreground mb-6">{error || "College details not found"}</p>
            <BackButton />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} Lakh`;
    }
    return `₹${amount.toLocaleString()}`;
  };

  const facilities = [
    { name: "Wi-Fi", value: collegeDetails.wifi },
    { name: "Library", value: collegeDetails.library },
    { name: "Hostel", value: collegeDetails.hostel },
    { name: "Canteen", value: collegeDetails.canteen },
    { name: "Gym", value: collegeDetails.gym },
    { name: "Sports", value: collegeDetails.sports },
    { name: "Medical Facilities", value: collegeDetails.medicalFacilities },
    { name: "Lateral Entry", value: collegeDetails.lateralEntryAvailable },
  ];

  // Update Apply Now button to use the handler
  const applyNowButton = (
    <Button className="w-full" onClick={handleApplyClick}>
      Apply Now
    </Button>
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <NewHeader />
      
      <main className="container mx-auto mt-20 px-4 py-8 animate-fade-in">
        <BackButton />
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{collegeDetails.name}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <Badge variant="outline" className="mr-2">{collegeDetails.level}</Badge>
              <Badge variant="outline" className="mr-2">{collegeDetails.specialization}</Badge>
              <Badge>{collegeDetails.category}</Badge>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {collegeDetails.collegeCode}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
                <CardDescription>Information about the academic program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Admission Criteria</h3>
                    <p>{collegeDetails.criteria}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Cutoff Rank</h3>
                    <p>{collegeDetails.cutoffRank.toLocaleString()}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Round Number</h3>
                    <p>{collegeDetails.roundNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Management Fees</h3>
                    <p>{formatCurrency(collegeDetails.managementFees)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Total Seats</h3>
                    <p>{collegeDetails.totalSeats}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Seats Available</h3>
                    <p>{collegeDetails.seatsAvailable}</p>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="font-semibold mb-4">Facilities Available</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {facilities.map((facility) => (
                    <div key={facility.name} className="flex items-center">
                      {facility.value ? (
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mr-2 h-5 w-5 text-red-500" />
                      )}
                      <span>{facility.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Placement Information ({collegeDetails.year})</CardTitle>
                <CardDescription>Placement statistics and recruiters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Placement Percentage</p>
                    <p className="text-2xl font-bold">{collegeDetails.placementPercentage}%</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Highest Package</p>
                    <p className="text-2xl font-bold">{formatCurrency(collegeDetails.highestPackage)}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-center">
                    <p className="text-muted-foreground mb-1">Average Package</p>
                    <p className="text-2xl font-bold">{formatCurrency(collegeDetails.averagePackage)}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-muted-foreground mb-2">Top Recruiters</h3>
                  <div className="flex flex-wrap gap-2">
                    {collegeDetails.topRecruiters.split(',').map((recruiter, index) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {recruiter.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">{collegeDetails.address}</p>
                    {collegeDetails.googleMapsLink && (
                      <a 
                        href={collegeDetails.googleMapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center text-sm text-primary mt-1 hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <a 
                      href={`mailto:${collegeDetails.email}`} 
                      className="text-primary hover:underline"
                    >
                      {collegeDetails.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium mb-1">Phone</p>
                    <a 
                      href={`tel:${collegeDetails.phone}`} 
                      className="text-primary hover:underline"
                    >
                      {collegeDetails.phone}
                    </a>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {applyNowButton}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CollegeDetails;
