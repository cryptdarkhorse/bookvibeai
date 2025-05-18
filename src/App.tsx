import React, { useState } from 'react';
import { BookSearch } from './components/BookSearch';
import { GenreFilter } from './components/GenreFilter';
import { BookGrid } from './components/BookGrid';
import { Navbar } from './components/Navbar';
import { AIAssistant } from './components/AIAssistant';
import { Background3D } from './components/Background3D';
import { useBooks } from './hooks/useBooks';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const { books, toggleFavorite, favorites } = useBooks();

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleGenreChange = (genres: string[]) => {
    setSelectedGenres(genres);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleAIAssistant = () => {
    setIsAIAssistantOpen(!isAIAssistantOpen);
  };

  const filteredBooks = books.filter(book => {
    const matchesGenre = selectedGenres.length === 0 || 
      book.genres.some(genre => selectedGenres.includes(genre));
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = !showFavorites || favorites.includes(book.id);
    
    return matchesGenre && matchesSearch && matchesFavorites;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Background3D />
      <Navbar 
        onToggleFavorites={handleToggleFavorites} 
        showFavorites={showFavorites}
        favoritesCount={favorites.length}
        onOpenAIAssistant={toggleAIAssistant}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64">
            <BookSearch onSearch={handleSearch} />
            <GenreFilter onGenreChange={handleGenreChange} selectedGenres={selectedGenres} />
          </aside>
          
          <main className="flex-1">
            <BookGrid books={filteredBooks} onToggleFavorite={toggleFavorite} favorites={favorites} />
          </main>
        </div>
      </div>
      
      {isAIAssistantOpen && (
        <AIAssistant onClose={toggleAIAssistant} />
      )}
    </div>
  );
}

export default App;