import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import MenuToggle from './MenuToggle';

const NewHeader: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with real auth
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [resultPage, setResultPage] = useState(1);
  const resultsPerPage = 4;
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    if (isSearchOpen) setSearchTerm('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate('/search', { state: { searchTerm } });
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchResults(searchTerm, 1);
        setResultPage(1);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch results
  const fetchResults = async (query: string, page: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://apicollegerepo.lytortech.com/api/v1/colleges/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : [];
      setSearchResults(results.slice(0, page * resultsPerPage));
      setShowDropdown(true);
    } catch (err) {
      setSearchResults([]);
      setShowDropdown(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showDropdown &&
        resultsContainerRef.current &&
        !resultsContainerRef.current.contains(event.target as Node) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  // Infinite scroll for more results
  useEffect(() => {
    const ref = resultsContainerRef.current;
    if (!ref) return;
    const handleScroll = () => {
      if (ref.scrollTop + ref.clientHeight >= ref.scrollHeight - 10 && searchResults.length >= resultPage * resultsPerPage) {
        setResultPage((prev) => prev + 1);
      }
    };
    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, [searchResults, resultPage]);

  useEffect(() => {
    if (resultPage > 1 && searchTerm.trim()) {
      fetchResults(searchTerm, resultPage);
    }
    // eslint-disable-next-line
  }, [resultPage]);

  // On click of a college in the dropdown
  const handleCollegeClick = async (collegeCode: string) => {
    try {
      const res = await fetch(`https://apicollegerepo.lytortech.com/admin/get/all_college_details/${collegeCode}`);
      const collegeDetails = await res.json();
      navigate(`/college/${collegeCode}`, { state: { collegeDetails } });
      setIsSearchOpen(false);
      setShowDropdown(false);
      setSearchTerm('');
    } catch (err) {
      // Optionally show error toast
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/40 animate-fade-in',
        'w-full'
      )}
    >
      {/* Hamburger menu (MenuToggle) */}
      <div className="flex items-center mr-2 md:hidden">
        <MenuToggle navLinks={[{label: 'Home', path: '/'}, {label: 'About Us', path: '/about-us'}, {label: 'Contact Us', path: '/contact-us'}]} />
      </div>
      {/* Logo */}
      <div
        className="text-xl font-display font-semibold cursor-pointer mr-4"
        onClick={() => navigate('/')}
      >
        EduPortal
      </div>
      {/* Nav Links - visible on md+ screens */}
      <nav className="hidden md:flex flex-1 justify-center gap-8">
        <a href="/" className="nav-link">Home</a>
        <a href="/about-us" className="nav-link">About Us</a>
        <a href="/contact-us" className="nav-link">Contact Us</a>
      </nav>
      {/* Login/Profile Button */}
      <div className="flex items-center ml-4">
        <Button
          className="btn-hover-effect flex items-center gap-2"
          onClick={() => isLoggedIn ? navigate('/profile') : navigate('/login')}
        >
          <User size={18} />
          {isLoggedIn ? <span>Profile</span> : <span>Login</span>}
        </Button>
      </div>
    </header>
  );
};

export default NewHeader;
