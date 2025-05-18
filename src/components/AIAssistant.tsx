import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIAssistantProps {
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI book assistant. Ask me for book recommendations, summaries, or anything about books and genres!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Mock AI responses based on user input
  const getAIResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('recommend') || lowercaseQuery.includes('suggestion')) {
      if (lowercaseQuery.includes('fantasy')) {
        return "Based on your interest in fantasy, I'd recommend:\n\n1. \"The Name of the Wind\" by Patrick Rothfuss\n2. \"Mistborn\" by Brandon Sanderson\n3. \"The Night Circus\" by Erin Morgenstern\n\nWould you like more specific fantasy recommendations?";
      } else if (lowercaseQuery.includes('sci-fi') || lowercaseQuery.includes('science fiction')) {
        return "For science fiction lovers, these are exceptional:\n\n1. \"Dune\" by Frank Herbert\n2. \"The Three-Body Problem\" by Liu Cixin\n3. \"Project Hail Mary\" by Andy Weir\n\nAre you interested in any particular sci-fi themes?";
      } else {
        return "I'd be happy to recommend some books! To give you the best suggestions, could you tell me what genres you enjoy or any favorite books you've read recently?";
      }
    } else if (lowercaseQuery.includes('summary') || lowercaseQuery.includes('about')) {
      if (lowercaseQuery.includes('dune')) {
        return "\"Dune\" by Frank Herbert is set in the distant future amidst a feudal interstellar society. It tells the story of young Paul Atreides, whose family accepts stewardship of the desert planet Arrakis, the only source of the most valuable substance in the universe, \"spice.\" As forces conflict over control of Arrakis, Paul is thrust into a destiny beyond his understanding. The novel explores themes of politics, religion, ecology, and human emotions.";
      } else if (lowercaseQuery.includes('harry potter')) {
        return "The Harry Potter series by J.K. Rowling follows the life of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all students at Hogwarts School of Witchcraft and Wizardry. The main story revolves around Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal and overthrow the wizard governing body known as the Ministry of Magic.";
      } else {
        return "I'd be happy to provide a summary! Which book would you like to know more about?";
      }
    } else if (lowercaseQuery.includes('genre') || lowercaseQuery.includes('category')) {
      if (lowercaseQuery.includes('fantasy')) {
        return "Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by myth and folklore. Unlike science fiction, it typically doesn't need a scientific or logical explanation for magical elements. Subgenres include high fantasy (like Lord of the Rings), urban fantasy (like Dresden Files), and magical realism (like One Hundred Years of Solitude).";
      } else if (lowercaseQuery.includes('mystery') || lowercaseQuery.includes('thriller')) {
        return "Mystery fiction is a genre where the plot revolves around a puzzling crime or situation that must be solved. Thrillers are similar but emphasize the danger that the protagonist faces, creating tension and excitement. Both often feature plot twists and suspense to keep readers engaged until the resolution.";
      } else {
        return "I can explain various book genres! Which particular genre would you like to learn more about?";
      }
    } else {
      return "I'm here to help with book-related questions! You can ask me for recommendations, summaries, information about genres, or specific authors. What would you like to know?";
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[550px] flex flex-col overflow-hidden">
        <div className="bg-blue-900 text-white px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <h3 className="font-semibold">BookVibe AI Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-lg px-4 py-2 ${
                  message.isUser 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <div className="whitespace-pre-line">{message.text}</div>
                <div 
                  className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-200' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 text-gray-800 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about books, genres, or recommendations..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className={`rounded-full p-2 ${
                !input.trim() || isTyping
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};