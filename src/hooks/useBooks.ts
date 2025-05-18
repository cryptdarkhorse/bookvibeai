import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { bookData } from '../data/books';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call with a delay
    const fetchBooks = async () => {
      setLoading(true);
      
      try {
        // For a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setBooks(bookData);
        
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('bookFavorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBooks();
  }, []);
  
  const toggleFavorite = (id: string) => {
    setFavorites(currentFavorites => {
      const updatedFavorites = currentFavorites.includes(id)
        ? currentFavorites.filter(favoriteId => favoriteId !== id)
        : [...currentFavorites, id];
      
      // Save to localStorage
      localStorage.setItem('bookFavorites', JSON.stringify(updatedFavorites));
      
      return updatedFavorites;
    });
  };
  
  return { books, favorites, loading, toggleFavorite };
};