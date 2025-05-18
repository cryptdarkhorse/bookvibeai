import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface BookSearchProps {
  onSearch: (query: string) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Mock AI suggestions based on query
  const mockAISuggestions = (query: string): string[] => {
    if (!query || query.length < 2) return [];
    
    const allSuggestions = [
      "Fantasy novels with strong female leads",
      "Science fiction books about time travel",
      "Books similar to Harry Potter",
      "Romance novels set in the 1800s",
      "Mystery books with unexpected endings",
      "Classic literature from the 20th century",
      "Biography of famous scientists",
      "Self-help books on productivity"
    ];
    
    return allSuggestions
      .filter(suggestion => suggestion.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3);
  };
  
  useEffect(() => {
    const handleSearch = setTimeout(() => {
      onSearch(query);
      setSuggestions(mockAISuggestions(query));
    }, 300);
    
    return () => clearTimeout(handleSearch);
  }, [query, onSearch]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div className="mb-6 relative" ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search books or ask for suggestions..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => {
                setQuery(suggestion);
                onSearch(suggestion);
                setShowSuggestions(false);
              }}
            >
              <Search className="h-4 w-4 text-gray-400 mr-2" />
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};