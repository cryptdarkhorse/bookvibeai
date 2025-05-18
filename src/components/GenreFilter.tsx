import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useGenres } from '../hooks/useGenres';

interface GenreFilterProps {
  onGenreChange: (genres: string[]) => void;
  selectedGenres: string[];
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ 
  onGenreChange, 
  selectedGenres 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const genres = useGenres();
  
  const handleGenreToggle = (genre: string) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
      
    onGenreChange(updatedGenres);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div 
        className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className="font-medium text-gray-700">Filter by Genre</h3>
        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </div>
      
      {isExpanded && (
        <div className="p-4 max-h-[300px] overflow-y-auto">
          {genres.map(genre => (
            <div key={genre} className="flex items-center mb-2 last:mb-0">
              <input
                type="checkbox"
                id={`genre-${genre}`}
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor={`genre-${genre}`} 
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                {genre}
              </label>
            </div>
          ))}
          
          {selectedGenres.length > 0 && (
            <button
              onClick={() => onGenreChange([])}
              className="mt-4 w-full px-3 py-1.5 text-xs text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};