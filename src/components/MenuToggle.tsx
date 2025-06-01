import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { User, Share2, FileText, Phone, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuToggleProps {
  className?: string;
  navLinks?: { label: string; path: string }[];
}

const MenuToggle: React.FC<MenuToggleProps> = ({ className, navLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('[data-sidebar="sidebar"]')) {
        setIsOpen(false);
      }
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button 
          className={cn("menu-toggle focus:outline-none", 
            isOpen ? "active" : "", 
            className
          )} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] bg-sidebar text-sidebar-foreground p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <h2 className="text-xl font-display font-semibold">EduPortal</h2>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navLinks && navLinks.map((item, index) => (
                <li key={index} style={{animationDelay: `${index * 50}ms`}} className="animate-fade-in">
                  <Link 
                    to={item.path} 
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-sidebar-border mt-auto">
            <p className="text-sm text-sidebar-foreground/70">© {new Date().getFullYear()} EduPortal</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuToggle;
