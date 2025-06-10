import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, CalendarDays, Briefcase, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import NewHeader from '@/components/NewHeader';

const InternshipDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    locationType,
    phone_number,
    price,
    timings,
    count,
    internship: internshipFallback
  } = location.state || {};
  const internship = internshipFallback || location.state;
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    resumeUrl: ''
  });

  if (!internship && !title) {
    return <div className="container mx-auto py-16 text-center">Internship not found.</div>;
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Submit logic here
    setIsApplyOpen(false);
    setFormData({ studentName: '', studentEmail: '', studentPhone: '', resumeUrl: '' });
    // Show toast or success message
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-background mt-16">
      <NewHeader />
      <div className="container mx-auto py-10 px-4 flex flex-col md:flex-row gap-8 animate-fade-in">
        <Card className="flex-1 p-8 shadow-md rounded-xl bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-primary mb-2">{title || internship?.title}</CardTitle>
            {internship?.providerName && (
              <a href="#" className="text-xl text-blue-700 font-semibold hover:underline mb-4 block">{internship.providerName}</a>
            )}
            <div className="flex flex-wrap gap-8 text-muted-foreground mb-6">
              {internship?.location && <div className="flex items-center gap-2"><MapPin className="h-5 w-5" />{internship.location}</div>}
              {locationType && <div className="flex items-center gap-2"><Briefcase className="h-5 w-5" />{locationType}</div>}
              {phone_number && <div className="flex items-center gap-2"><Phone className="h-5 w-5" />{phone_number}</div>}
              {typeof price !== 'undefined' && <div className="flex items-center gap-2"><span className="font-semibold">$</span>{formatCurrency(price)}/month</div>}
              {timings?.startDate && <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5" />Start: {timings.startDate}</div>}
              {timings?.endDate && <div className="flex items-center gap-2"><CalendarDays className="h-5 w-5" />End: {timings.endDate}</div>}
              {typeof count !== 'undefined' && count !== null && <div className="flex items-center gap-2"><span className="font-semibold">Count:</span> {count}</div>}
            </div>
            <CardDescription className="text-lg text-foreground mb-6">{description || internship?.description}</CardDescription>
            <div className="flex gap-2 mb-4">
              {internship?.type && <span className="px-3 py-1 rounded bg-gray-100 text-gray-800 text-sm font-medium">{internship.type}</span>}
              <span className="px-3 py-1 rounded bg-green-100 text-green-800 text-sm font-medium">Open</span>
            </div>
          </CardHeader>
        </Card>
        <Card className="w-full md:w-[350px] p-8 shadow-md rounded-xl bg-white flex flex-col items-center justify-center">
          <CardHeader className="w-full pb-2">
            <CardTitle className="text-2xl font-bold text-center mb-2">Apply Now</CardTitle>
            <div className="text-green-600 text-3xl font-bold text-center mb-1">{formatCurrency(internship.stipend)}/month</div>
            <div className="text-center text-muted-foreground mb-4">Monthly Stipend</div>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center">
            <Button className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-base transition-colors duration-200 mb-4" onClick={() => setIsApplyOpen(true)}>
              Apply for Internship
            </Button>
            <div className="w-full border-t border-gray-200 my-4"></div>
            <div className="text-center w-full">
              <div className="text-muted-foreground text-sm mb-1">Application Deadline</div>
              <div className="text-red-600 text-lg font-semibold">{new Date(internship.applicationDeadline).toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
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
              <Input id="studentName" name="studentName" value={formData.studentName} onChange={handleInputChange} placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentEmail">Email</Label>
              <Input id="studentEmail" name="studentEmail" type="email" value={formData.studentEmail} onChange={handleInputChange} placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentPhone">Phone Number</Label>
              <Input id="studentPhone" name="studentPhone" value={formData.studentPhone} onChange={handleInputChange} placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input id="resumeUrl" name="resumeUrl" value={formData.resumeUrl} onChange={handleInputChange} placeholder="Enter your resume URL" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-[#16A34A] hover:bg-[#15803D] text-white">
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default InternshipDetails; 