import React from 'react';
import { Book } from '../types/Book';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

export const BookGrid: React.FC<BookGridProps> = ({ 
  books, 
  onToggleFavorite, 
  favorites 
}) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <img 
          src="https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800" 
          alt="No books found" 
          className="w-48 h-48 object-cover rounded-full mb-6 opacity-50"
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No books found</h2>
        <p className="text-gray-500 max-w-md">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <BookCard 
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={() => onToggleFavorite(book.id)}
        />
      ))}
    </div>
  );
};