import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';

interface Hackathon {
  id: number;
  title: string;
  description: string;
  applicationDeadline: string;
  startDate: string;
  endDate: string;
  status: string;
  locationType: string;
  organizer: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  prizeDetails: string;
  themes: string;
  maxTeamSize: number;
  rulesDocumentUrl: string;
}

interface HackathonRegistration {
  teamName: string;
  teamLeaderEmail: string;
  teamLeaderPhone: string;
  projectTitle: string;
  projectDescription: string;
  projectRepoUrl: string;
  presentation?: File;
}

const API_URL = 'https://apicollegerepo.lytortech.com';

const Hackathon = () => {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [registrationForm, setRegistrationForm] = useState<HackathonRegistration>({
    teamName: '',
    teamLeaderEmail: '',
    teamLeaderPhone: '',
    projectTitle: '',
    projectDescription: '',
    projectRepoUrl: '',
  });

  // Fetch hackathons
  const { data: hackathons, isLoading, error } = useQuery({
    queryKey: ['hackathons', statusFilter],
    queryFn: async () => {
      const url = `${API_URL}/api/hackathons${statusFilter ? `?status=${statusFilter}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch hackathons');
      }
      return response.json() as Promise<Hackathon[]>;
    },
  });

  // Fetch open hackathons
  const { data: openHackathons } = useQuery({
    queryKey: ['openHackathons'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/hackathons/open`);
      if (!response.ok) {
        throw new Error('Failed to fetch open hackathons');
      }
      return response.json() as Promise<Hackathon[]>;
    },
  });

  // Add a derived filteredHackathons array based on statusFilter
  const filteredHackathons = (hackathons || []).filter(h => {
    if (!statusFilter || statusFilter === 'all') return true;
    return h.locationType && h.locationType.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegistrationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRegistrationForm(prev => ({ ...prev, presentation: e.target.files![0] }));
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHackathon) return;

    try {
      const formData = new FormData();
      Object.entries(registrationForm).forEach(([key, value]) => {
        if (key === 'presentation' && value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        }
      });

      const response = await fetch(`${API_URL}/api/registrations/${selectedHackathon.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const result = await response.json();
      toast({
        title: 'Registration successful!',
        description: 'Your hackathon registration has been submitted.',
      });

      // Reset form
      setRegistrationForm({
        teamName: '',
        teamLeaderEmail: '',
        teamLeaderPhone: '',
        projectTitle: '',
        projectDescription: '',
        projectRepoUrl: '',
      });
      setSelectedHackathon(null);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NewHeader />
      <main className="flex-1 container mx-auto px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 ">Hackathons</h1>
        <p className="text-lg text-secondary mb-8">
          Participate in exciting hackathons, showcase your skills, and win amazing prizes.
        </p>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="browse">Browse Hackathons</TabsTrigger>
            <TabsTrigger value="register" disabled={!selectedHackathon}>
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-end mb-4">
              <Select
                onValueChange={(value) => setStatusFilter(value || null)}
                defaultValue=""
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-10 text-destructive">
                Error loading hackathons. Please try again later.
              </div>
            ) : hackathons && hackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHackathons.map((hackathon) => {
                  const now = new Date();
                  const applyByDate = new Date(hackathon.applicationDeadline);
                  const isOpen = hackathon.status === 'OPEN' && now < applyByDate;
                  return (
                    <div
                      key={hackathon.id}
                      className="bg-surface border border-border rounded-xl shadow-md p-6 flex flex-col h-full transition-all hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-primary line-clamp-2">{hackathon.title}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${hackathon.status === 'OPEN' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'}`}>{hackathon.status}</span>
                      </div>
                      <p className="text-secondary mb-2 line-clamp-3">{hackathon.description}</p>
                      <div className="text-sm text-text-light mb-2 space-y-1">
                        <div><span className="font-medium">Apply By:</span> {formatDate(hackathon.applicationDeadline)}</div>
                        <div><span className="font-medium">Dates:</span> {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</div>
                        <div><span className="font-medium">Location:</span> {hackathon.locationType}</div>
                        <div><span className="font-medium">Organizer:</span> {hackathon.organizer}</div>
                        <div><span className="font-medium">Max Team Size:</span> {hackathon.maxTeamSize}</div>
                        {hackathon.themes && <div><span className="font-medium">Themes:</span> {hackathon.themes}</div>}
                        {hackathon.prizeDetails && <div><span className="font-medium">Prizes:</span> {hackathon.prizeDetails}</div>}
                        {hackathon.rulesDocumentUrl && (
                          <a href={hackathon.rulesDocumentUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline text-sm mt-1">
                            Rules Document
                          </a>
                        )}
                        {hackathon.websiteUrl && (
                          <a href={hackathon.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-1">
                            Hackathon Website
                          </a>
                        )}
                        <div className="mt-2 text-xs text-secondary">
                          <span>Contact: {hackathon.contactEmail} {hackathon.contactPhone && `| ${hackathon.contactPhone}`}</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white border-none"
                          onClick={() => setSelectedHackathon(hackathon)}
                        >
                          Register
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No hackathons found. Please check back later.
              </div>
            )}
          </TabsContent>

          <TabsContent value="register">
            {selectedHackathon && (
              <div className="space-y-6">
                <div className="bg-muted/30 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-medium mb-2">Registering for: {selectedHackathon.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Application Deadline: {formatDate(selectedHackathon.applicationDeadline)}
                  </p>
                </div>

                <form onSubmit={handleRegistration} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="teamName" className="block text-sm font-medium">Team Name *</label>
                    <Input
                      id="teamName"
                      name="teamName"
                      value={registrationForm.teamName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="teamLeaderEmail" className="block text-sm font-medium">Team Leader Email *</label>
                      <Input
                        id="teamLeaderEmail"
                        name="teamLeaderEmail"
                        type="email"
                        value={registrationForm.teamLeaderEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="teamLeaderPhone" className="block text-sm font-medium">Team Leader Phone *</label>
                      <Input
                        id="teamLeaderPhone"
                        name="teamLeaderPhone"
                        value={registrationForm.teamLeaderPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectTitle" className="block text-sm font-medium">Project Title *</label>
                    <Input
                      id="projectTitle"
                      name="projectTitle"
                      value={registrationForm.projectTitle}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectDescription" className="block text-sm font-medium">Project Description *</label>
                    <Textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={registrationForm.projectDescription}
                      onChange={handleInputChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectRepoUrl" className="block text-sm font-medium">Project Repository URL</label>
                    <Input
                      id="projectRepoUrl"
                      name="projectRepoUrl"
                      value={registrationForm.projectRepoUrl}
                      onChange={handleInputChange}
                      placeholder="e.g. https://github.com/username/project"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="presentation" className="block text-sm font-medium">Presentation (PDF/PPT)</label>
                    <Input
                      id="presentation"
                      name="presentation"
                      type="file"
                      accept=".pdf,.ppt,.pptx"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto bg-[#EA580C] hover:bg-[#c2410c] text-white">
                      Submit Registration
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Hackathon;
