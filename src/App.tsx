import React, { Suspense, lazy, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import AnalyticsTracker from '@/components/AnalyticsTracker';

// Lazy load components to reduce initial bundle size
const Index = lazy(() => import("./pages/Index"));
const SearchedCollege = lazy(() => import("./pages/SearchedCollege"));
const OpenDegree = lazy(() => import("./pages/OpenDegree"));
const Colleges = lazy(() => import("./pages/Colleges"));
const Internships = lazy(() => import("./pages/Internships"));
const CollegeDetails = lazy(() => import("./pages/CollegeDetails"));
const Workshops = lazy(() => import("./pages/Workshops"));
const Hackathon = lazy(() => import("./pages/Hackathon"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Terms = lazy(() => import("./pages/Terms"));
const Refer = lazy(() => import("./pages/Refer"));
const International = lazy(() => import("./pages/International"));
const OpenCourses = lazy(() => import("./pages/OpenCourses"));
const Login = lazy(() => import("./pages/Login"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse flex space-x-2">
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
      <div className="w-3 h-3 bg-primary rounded-full"></div>
    </div>
  </div>
);

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

const App = () => {
  // Move QueryClient initialization inside the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchedCollege />} />
              <Route path="/open-degree" element={<OpenDegree />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/college/:collegeCode" element={<CollegeDetails />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/workshops" element={<Workshops />} />
              <Route path="/hackathon" element={<Hackathon />} />
              
              {/* New routes for the pages we just created */}
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/refer" element={<Refer />} />
                
              {/* Placeholder routes for navigation links */}
              <Route path="/international" element={<International />} />
              <Route path="/open-courses" element={<OpenCourses />} />
                
              {/* Header menu routes */}
              <Route path="/profile" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnalyticsTracker>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
