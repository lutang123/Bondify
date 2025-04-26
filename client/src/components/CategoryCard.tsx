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
  // Function to get gradient based on category id - softer pastel colors
  function getButtonGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-r from-pink-400 to-pink-500';
      case 'lovers':
        return 'bg-gradient-to-r from-purple-400 to-purple-500';
      case 'sunlit':
        return 'bg-gradient-to-r from-yellow-300 to-yellow-400';
      case 'brainstorm':
        return 'bg-gradient-to-r from-orange-300 to-orange-400';
      case 'woodland':
        return 'bg-gradient-to-r from-green-300 to-green-400';
      case 'mirror':
        return 'bg-gradient-to-r from-blue-300 to-blue-400';
      default:
        return 'bg-gradient-to-r from-purple-400 to-pink-400';
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

  // Function to get overlay gradient based on category id - softer pastel colors with reduced opacity
  function getOverlayGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-t from-pink-400/60 to-transparent';
      case 'lovers':
        return 'bg-gradient-to-t from-purple-400/60 to-transparent';
      case 'sunlit':
        return 'bg-gradient-to-t from-yellow-300/60 to-transparent';
      case 'brainstorm':
        return 'bg-gradient-to-t from-orange-300/60 to-transparent';
      case 'woodland':
        return 'bg-gradient-to-t from-green-300/60 to-transparent';
      case 'mirror':
        return 'bg-gradient-to-t from-blue-300/60 to-transparent';
      default:
        return 'bg-gradient-to-t from-gray-400/60 to-transparent';
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
        {/* White overlay to soften the image - 15% opacity */}
        <div className="absolute inset-0 bg-white/15"></div>
        {/* Color gradient overlay on top of white overlay */}
        <div className={`absolute inset-0 ${getOverlayGradient(id)}`}></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-accent text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-700 text-sm">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-100 text-purple-500 text-xs rounded-full flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
        </div>
        {/* Main tagline with more emphasis */}
        <p className="text-gray-900 font-medium mb-3 text-base leading-snug">
          {description.split('.')[0]}.
        </p>
        <p className="text-gray-600 mb-4 text-sm">
          {description.split('.').slice(1).join('.')}
        </p>
        <p className="italic text-sm text-gray-500 mb-4 border-l-2 pl-3 border-gray-200">
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
