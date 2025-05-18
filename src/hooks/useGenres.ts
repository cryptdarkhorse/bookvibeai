import { useState, useEffect } from 'react';
import { bookData } from '../data/books';

export const useGenres = () => {
  const [genres, setGenres] = useState<string[]>([]);
  
  useEffect(() => {
    // Extract unique genres from all books
    const allGenres = bookData.flatMap(book => book.genres);
    const uniqueGenres = [...new Set(allGenres)].sort();
    setGenres(uniqueGenres);
  }, []);
  
  return genres;
};