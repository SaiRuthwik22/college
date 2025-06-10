import React, { useEffect, useRef } from 'react';
import NewHeader from '@/components/NewHeader';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import NavigationLinks from '@/components/NavigationLinks';
import ChatButton from '@/components/ChatButton';
import { useToast } from '@/components/ui/use-toast';
import { GraduationCap, Bookmark, Globe, Briefcase, Cpu, BookOpen, ArrowRight, Users, Award, Shield, CheckCircle, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import '@/styles/custom.css';

// Placeholder images for the carousel
const carouselImages = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1000&auto=format&fit=crop',
];

const homeLinks = [
  { name: 'Colleges', icon: GraduationCap, desc: 'Explore top colleges and universities', color: 'bg-blue-500', btn: 'bg-blue-600 hover:bg-blue-700', iconColor: 'text-white' },
  { name: 'Internships', icon: Briefcase, desc: 'Find valuable internship opportunities', color: 'bg-green-500', btn: 'bg-green-600 hover:bg-green-700', iconColor: 'text-white' },
  { name: 'Workshop', icon: Globe, desc: 'Attend skill-building workshops', color: 'bg-purple-500', btn: 'bg-purple-600 hover:bg-purple-700', iconColor: 'text-white' },
  { name: 'Hackathon', icon: Cpu, desc: 'Participate in coding competitions', color: 'bg-orange-500', btn: 'bg-orange-600 hover:bg-orange-700', iconColor: 'text-white' },
  { name: 'Open Degree', icon: Bookmark, desc: 'Pursue flexible degree programs', color: 'bg-teal-500', btn: 'bg-teal-600 hover:bg-teal-700', iconColor: 'text-white' },
];

const stats = [
  { label: 'Colleges', value: '1000+' },
  { label: 'Programs', value: '500+' },
  { label: 'Student Satisfaction', value: '98%' },
];
const partners = [
  { name: 'Partner 1', logo: '/partner1.png' },
  { name: 'Partner 2', logo: '/partner2.png' },
  { name: 'Partner 3', logo: '/partner3.png' },
];

const aboutStats = [
  { value: '1000+', label: 'Partner Institutions' },
  { value: '95%', label: 'Success Rate', color: 'text-accent' },
  { value: '24/7', label: 'Support Available', color: 'text-primary' },
];

const aboutFeatures = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary mx-auto" />,
    title: 'Verified Institutions',
    desc: 'All colleges and programs are thoroughly verified and accredited',
  },
  {
    icon: <User className="h-8 w-8 text-primary mx-auto" />,
    title: 'Expert Guidance',
    desc: 'Get personalized counseling from education experts',
  },
  {
    icon: <Award className="h-8 w-8 text-primary mx-auto" />,
    title: 'Quality Assurance',
    desc: 'Only the best opportunities make it to our platform',
  },
  {
    icon: <Globe className="h-8 w-8 text-primary mx-auto" />,
    title: 'Global Reach',
    desc: 'Access educational opportunities worldwide',
  },
];

function HomeOpportunitiesLinks() {
  const linkRoutes = {
    'Colleges': '/colleges',
    'Open Degree': '/open-degree',
    'Workshop': '/workshops',
    'Internships': '/internships',
    'Hackathon': '/hackathon',
    'Open Courses': '/open-courses',
  };
  return (
    <div className="w-full flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10 xl:gap-12">
      {homeLinks.map((link, idx) => (
        <div key={link.name} className="flex">
          <div className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="w-[210px] h-[310px] bg-white rounded-2xl shadow-md flex flex-col items-center p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg mx-auto" style={{ minWidth: 210, maxWidth: 210 }}>
              <div className={`w-20 h-20 flex items-center justify-center rounded-full mb-4 ${link.color}`}>
                {link.icon ? (
                  <link.icon size={40} className={link.iconColor} />
                ) : null}
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{link.name}</h3>
                <p className="text-gray-600 text-base mb-6">{link.desc}</p>
              </div>
              <a href={linkRoutes[link.name]} className={`w-full mt-auto rounded-lg py-2 px-4 text-white font-semibold text-base text-center transition-colors duration-200 ${link.btn}`}>Explore Now</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const Index = () => {
  const featuredSectionRef = useRef<HTMLDivElement>(null);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const getStartedSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    [featuredSectionRef, cardSectionRef, getStartedSectionRef].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const aboutSubsections = [
    {
      title: "Our Mission",
      text: "EduPortal is on a mission to democratize access to quality education. We empower students to discover, compare, and connect with top institutions and programs worldwide, making informed decisions for their future.",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Our Vision",
      text: "We envision a world where every student has access to the educational opportunities they deserve, regardless of their background. We strive to be the bridge that connects aspirations with achievements in the educational journey.",
      imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Our Values",
      text: "Integrity, student-centricity, innovation, and accessibility are at the core of everything we do. We are committed to providing a transparent and supportive platform for all.",
      imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col home-page">
      <NewHeader />
      
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[70vh] mt-16">
        <Carousel images={carouselImages} autoPlay={true} interval={4000} />
      </section>
      <section 
        ref={featuredSectionRef}
        className="container mx-auto py-12 md:py-16 px-4 opacity-0 transition-opacity duration-700"
      >
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-xl md:text-2xl font-display font-semibold mb-8 md:mb-10 relative">
            <span className="inline-block pb-2">
              Educational Opportunities
            </span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/20 rounded"></span>
          </h2>
          <HomeOpportunitiesLinks />
        </div>
      </section>
            {/* Get Started Section */}
            <section 
        ref={getStartedSectionRef}
        className="w-full py-12 md:py-16 px-4 sm:px-8 md:px-20 lg:px-20 opacity-0 transition-opacity duration-700"
      >
        <div className="w-full">
          <div className="rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#9333ea] p-6 md:p-12 w-full flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Get Started Today</h2>
            <p className="text-lg mb-8 text-white">
              Begin your educational journey with EduPortal. Explore colleges, apply for programs, 
              and take the first step towards your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
                onClick={() => window.location.href = '/colleges'}
              >
                Explore Colleges
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* About Eduportal Section */}
      <section className="py-4 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Eduportal</h2>
          
          <div className="space-y-16">
            {aboutSubsections.map((subsection, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-0`}
              >
                {/* Text Content */}
                <div className="w-full md:w-[48%] flex flex-col items-center md:items-start text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-4">{subsection.title}</h3>
                  <p className="text-lg text-secondary leading-relaxed">{subsection.text}</p>
                </div>
                {/* Image */}
                <div className={`w-full md:w-[48%] flex justify-center ${index % 2 === 0 ? 'md:ml-[4%]' : 'md:mr-[4%]'}`}> 
                  <img 
                    src={subsection.imageUrl} 
                    alt={subsection.title} 
                    className="rounded-xl shadow-lg w-full object-cover" 
                    style={{ maxHeight: '260px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Opportunities Section */}



      
      {/* Info Cards Section */}
      <section 
        ref={cardSectionRef}
        className="container mx-auto py-10 md:py-12 px-4 opacity-0 transition-opacity duration-700"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Featured Colleges",
              description: "Discover top-rated colleges and universities offering exceptional educational experiences."
            },
            {
              title: "International Programs",
              description: "Explore study abroad opportunities and international exchanges for global perspectives."
            },
            {
              title: "Career Advancement",
              description: "Find internships and professional development resources to accelerate your career growth."
            }
          ].map((card, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-border/40 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">{card.title}</h3>
              <p className="text-text-light">{card.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
      {/* <ChatButton /> */}
    </div>
  );
};

export default Index;
