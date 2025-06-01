import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchBarProps {
  className?: string;
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  onSearch?: (query: string) => void;
  results?: any[];
  onResultClick?: (result: any) => void;
  renderResult?: (result: any) => React.ReactNode;
}

const DEBOUNCE_DELAY = 400;

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  filterOpen,
  setFilterOpen,
  onSearch,
  results = [],
  onResultClick,
  renderResult,
}) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    if (!onSearch) return;
    const handler = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative flex items-center w-full', className)}>
      <div className="flex items-center w-full relative">
        <span className="absolute left-3 text-secondary">
          <Search size={20} strokeWidth={2.5} />
        </span>
        <Input
          ref={inputRef}
          type="text"
          className={clsx(
            'pl-10 pr-4 py-3 w-full rounded-lg border border-surface bg-white text-text-light focus:outline-none focus:ring-2 focus:ring-primary/30 text-base transition-colors',
            'search-input',
          )}
          placeholder="Search colleges, courses, or keywords..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim() && results.length > 0) setShowDropdown(true);
          }}
          aria-label="Search"
          style={{ background: 'white' }}
        />
        <Button
          type="button"
          variant={filterOpen ? 'secondary' : 'outline'}
          onClick={() => setFilterOpen(!filterOpen)}
          aria-label="Open filters"
          className={clsx('ml-2', filterOpen && 'bg-primary text-white')}
        >
          <Filter size={18} />
        </Button>
      </div>
      {showDropdown && results.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full mt-1 bg-white border border-border rounded-md shadow-lg z-50 max-h-72 overflow-y-auto"
        >
          {results.map((result, idx) => (
            <div
              key={result.id || idx}
              className="flex items-center gap-3 px-4 py-2 hover:bg-accent/10 cursor-pointer border-b last:border-b-0 transition-colors"
              onClick={() => onResultClick && onResultClick(result)}
            >
              {renderResult ? renderResult(result) : <span>{result.name}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 