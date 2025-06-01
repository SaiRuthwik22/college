
import React from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const contactInfo = {
  email: "admin@joiningcollege.com",
  alternateEmail: "support@joiningcollege.com",
  phone: "+91-9876543210",
  whatsapp: "+91-9876543210",
  website: "https://www.joiningcollege.com",
  facebook: "https://www.facebook.com/joiningcollege",
  instagram: "https://www.instagram.com/joiningcollege",
  twitter: "https://www.twitter.com/joiningcollege",
  linkedIn: "https://www.linkedin.com/company/joiningcollege",
  telegram: "https://t.me/joiningcollege",
  address: "123 Main Street, Hyderabad, Telangana, India - 500001",
  latitude: 17.385044,
  longitude: 78.486671,
  googleMapsUrl: "https://maps.google.com/?q=17.385044,78.486671",
  supportHours: "Mon-Fri, 9 AM to 6 PM",
  contactPersonName: "Mr. Rakesh Sharma"
};

const teamMembers = [
  {
    name: 'Rakesh Sharma',
    role: 'CEO & Founder',
    bio: 'With over 15 years of experience in education technology, Rakesh founded EduPortal with a vision to make quality education accessible to all.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format'
  },
  {
    name: 'Priya Singh',
    role: 'Chief Education Officer',
    bio: 'Priya leads our educational content development team, ensuring all resources meet the highest academic standards.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format'
  },
  {
    name: 'Anil Kumar',
    role: 'Head of Technology',
    bio: 'Anil oversees all technical aspects of the platform, keeping our systems reliable, secure, and state-of-the-art.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format'
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewHeader />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About EduPortal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting students with their dream educational opportunities since 2018
          </p>
        </div>
        
        {/* Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                At EduPortal, we are committed to democratizing access to quality education. 
                Our mission is to create a comprehensive platform that connects students with 
                educational institutions, scholarships, and resources that help them achieve 
                their academic and career goals.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a world where every student has access to the educational opportunities 
                they deserve, regardless of their background. We strive to be the bridge that 
                connects aspirations with achievements in the educational journey.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Our Story */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Our Story</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Founded in 2018, EduPortal began with a simple idea: make the college search and 
                  application process easier for students in India. What started as a small database 
                  of college information has grown into a comprehensive educational ecosystem.
                </p>
                <p className="text-muted-foreground">
                  Our founder, {contactInfo.contactPersonName}, saw firsthand the challenges students 
                  faced when trying to find the right educational path. With a background in both education 
                  and technology, he assembled a team of passionate educators and developers to create 
                  a solution.
                </p>
                <p className="text-muted-foreground">
                  Today, EduPortal serves thousands of students across India, helping them discover 
                  colleges, apply for scholarships, find internships, and prepare for their future careers. 
                  We continue to grow and evolve, guided by our commitment to student success.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Team Members */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <AspectRatio ratio={1} className="bg-muted">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">Get in Touch</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="text-primary" />
                  </div>
                  <h3 className="font-medium">Email Us</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                    {contactInfo.email}
                  </a>
                  <a href={`mailto:${contactInfo.alternateEmail}`} className="text-primary hover:underline">
                    {contactInfo.alternateEmail}
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="text-primary" />
                  </div>
                  <h3 className="font-medium">Visit Our Website</h3>
                  <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {contactInfo.website.replace('https://', '')}
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-primary" />
                  </div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                  <a 
                    href={contactInfo.googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button asChild>
                  <a href="/contact-us">Contact Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
