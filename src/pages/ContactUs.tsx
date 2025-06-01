
import React from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Linkedin, Send } from 'lucide-react';
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

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewHeader />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <Phone size={20} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">{contactInfo.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Mail size={20} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">{contactInfo.email}</p>
                      <p className="text-muted-foreground">{contactInfo.alternateEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin size={20} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">{contactInfo.address}</p>
                      <a 
                        href={contactInfo.googleMapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline mt-1 inline-block"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Support Hours</h3>
                      <p className="text-muted-foreground">{contactInfo.supportHours}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a 
                      href={contactInfo.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary hover:bg-secondary/80 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} />
                    </a>
                    <a 
                      href={contactInfo.instagram}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary hover:bg-secondary/80 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram size={18} />
                    </a>
                    <a 
                      href={contactInfo.twitter}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-secondary hover:bg-secondary/80 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter size={18} />
                    </a>
                    <a 
                      href={contactInfo.linkedIn}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-secondary hover:bg-secondary/80 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column: Contact Form and Map */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm">Your Name</label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm">Email Address</label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm">Subject</label>
                    <Input id="subject" placeholder="Enter subject" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm">Message</label>
                    <Textarea id="message" placeholder="Enter your message" rows={6} />
                  </div>
                  
                  <Button type="submit" className="w-full sm:w-auto">
                    <Send size={16} className="mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="w-full h-[300px] overflow-hidden rounded-md">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <iframe 
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2954839917354!2d${contactInfo.longitude}!3d${contactInfo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDIzJzA2LjIiTiA3OMKwMjknMTIuMCJF!5e0!3m2!1sen!2sin!4v1620122053727!5m2!1sen!2sin`}
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                      title="Google Maps Location"
                      className="rounded"
                    ></iframe>
                  </AspectRatio>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
