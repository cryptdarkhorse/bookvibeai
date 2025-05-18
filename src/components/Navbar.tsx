import React from 'react';
import { Heart, BookOpen, Search, MessageSquareText } from 'lucide-react';

interface NavbarProps {
  onToggleFavorites: () => void;
  showFavorites: boolean;
  favoritesCount: number;
  onOpenAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onToggleFavorites, 
  showFavorites, 
  favoritesCount,
  onOpenAIAssistant
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-200" />
            <h1 className="text-xl font-bold">BookVibe</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenAIAssistant}
              className="flex items-center space-x-1 px-3 py-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
            >
              <MessageSquareText size={18} />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
            
            <button 
              onClick={onToggleFavorites}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                showFavorites 
                  ? 'bg-red-600 hover:bg-red-500' 
                  : 'bg-blue-700 hover:bg-blue-600'
              }`}
            >
              <Heart size={18} className={showFavorites ? 'fill-white' : ''} />
              <span className="hidden sm:inline">
                {showFavorites ? 'All Books' : 'Favorites'}
              </span>
              {favoritesCount > 0 && !showFavorites && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};