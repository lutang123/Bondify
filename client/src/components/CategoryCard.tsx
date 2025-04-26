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
  // Function to get gradient based on category id - even lighter, softer pastel colors
  function getButtonGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-r from-pink-300 to-pink-400';
      case 'lovers':
        return 'bg-gradient-to-r from-purple-300 to-purple-400';
      case 'sunlit':
        return 'bg-gradient-to-r from-yellow-200 to-yellow-300';
      case 'brainstorm':
        return 'bg-gradient-to-r from-orange-200 to-orange-300';
      case 'woodland':
        return 'bg-gradient-to-r from-green-200 to-green-300';
      case 'mirror':
        return 'bg-gradient-to-r from-blue-200 to-blue-300';
      default:
        return 'bg-gradient-to-r from-purple-300 to-pink-300';
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

  // Function to get overlay gradient based on category id - even lighter, softer pastel colors with gentle opacity
  function getOverlayGradient(id: string): string {
    switch(id) {
      case 'twilight':
        return 'bg-gradient-to-t from-pink-300/50 to-transparent';
      case 'lovers':
        return 'bg-gradient-to-t from-purple-300/50 to-transparent';
      case 'sunlit':
        return 'bg-gradient-to-t from-yellow-200/50 to-transparent';
      case 'brainstorm':
        return 'bg-gradient-to-t from-orange-200/50 to-transparent';
      case 'woodland':
        return 'bg-gradient-to-t from-green-200/50 to-transparent';
      case 'mirror':
        return 'bg-gradient-to-t from-blue-200/50 to-transparent';
      default:
        return 'bg-gradient-to-t from-gray-300/50 to-transparent';
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
        {/* White overlay to soften the image - 20% opacity */}
        <div className="absolute inset-0 bg-white/20"></div>
        {/* Color gradient overlay on top of white overlay */}
        <div className={`absolute inset-0 ${getOverlayGradient(id)}`}></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-accent text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          {/* Tagline - clearer connection to main title */}
          <h4 className="font-semibold text-gray-700 text-sm">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-50 text-purple-400 text-xs rounded-full flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
        </div>
        
        {/* Hook/Prompt with emphasis */}
        <p className="text-gray-900 font-medium mb-3 text-base leading-snug">
          {description.split('.')[0]}.
        </p>
        
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm">
          {description.split('.').slice(1).join('.')}
        </p>
        
        {/* Slogan/Tagline without quote marks */}
        <p className="italic text-sm text-gray-500 mb-4 border-l-2 pl-3 border-gray-200">
          {quote}
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
