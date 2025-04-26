import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
  delay?: number;
}

export default function CategoryCard({ category, delay = 0 }: CategoryCardProps) {
  // Function to get gradient based on category id
  function getButtonGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-r from-pink-500 to-pink-600';
      case 'lovers':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'sunlit':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 'brainstorm':
        return 'bg-gradient-to-r from-orange-400 to-orange-500';
      case 'woodland':
        return 'bg-gradient-to-r from-green-400 to-green-500';
      case 'mirror':
        return 'bg-gradient-to-r from-blue-400 to-blue-500';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500';
    }
  }
  const {
    id,
    name,
    subtitle,
    description,
    quote,
    imageUrl,
    isPremium
  } = category;

  // Function to get overlay gradient based on category id
  function getOverlayGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-t from-pink-500/80 to-transparent';
      case 'lovers':
        return 'bg-gradient-to-t from-purple-500/80 to-transparent';
      case 'sunlit':
        return 'bg-gradient-to-t from-yellow-400/80 to-transparent';
      case 'brainstorm':
        return 'bg-gradient-to-t from-orange-400/80 to-transparent';
      case 'woodland':
        return 'bg-gradient-to-t from-green-400/80 to-transparent';
      case 'mirror':
        return 'bg-gradient-to-t from-blue-400/80 to-transparent';
      default:
        return 'bg-gradient-to-t from-gray-500/80 to-transparent';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="category-card rounded-3xl overflow-hidden shadow-soft bg-white border border-gray-100 hover:border-gray-300"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover object-center" 
          loading="lazy"
        />
        <div className={`absolute inset-0 ${getOverlayGradient(id)}`}></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-accent text-2xl font-bold text-white drop-shadow-md">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-900">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-100 text-purple-500 text-xs rounded-full flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <p className="italic text-sm text-gray-500 mb-4">
          "{quote}"
        </p>
        <Link 
          href={`/category/${id}`} 
          className={`block w-full py-3 rounded-full ${getButtonGradient(id)} text-white text-center font-medium hover:shadow-md transition-all`}
        >
          Start Your Journey
        </Link>
      </div>
    </motion.div>
  );
}
