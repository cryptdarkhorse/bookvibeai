import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  isFavorite, 
  onToggleFavorite 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-64 group">
        <motion.img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full ${
            isFavorite 
              ? 'bg-red-100 text-red-500' 
              : 'bg-white text-gray-400 hover:text-red-500'
          } transition-colors duration-200 shadow-sm hover:shadow-md`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
        </motion.button>
      </div>
      
      <motion.div 
        className="p-4 bg-gradient-to-br from-white to-gray-50"
        whileHover={{ y: -5 }}
      >
        <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-3 text-sm">{book.author}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {book.genres.map(genre => (
            <motion.span 
              key={genre}
              whileHover={{ scale: 1.1 }}
              className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-2 py-1 rounded-full"
            >
              {genre}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span className="bg-blue-50 px-2 py-1 rounded-full">{book.pages} pages</span>
          <span className="bg-purple-50 px-2 py-1 rounded-full">{book.year}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};