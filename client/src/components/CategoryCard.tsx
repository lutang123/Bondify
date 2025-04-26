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

  // Define the prompt text based on category
  const getPromptText = () => {
    switch(id) {
      case 'twilight': return "Don't believe in love at first sight? Try this.";
      case 'lovers': return "Curious about your partner's spicy secrets?";
      case 'sunlit': return "In a bar or meetup and everyone's glued to their phones?";
      case 'brainstorm': return "Up for some mental gymnastics?";
      case 'woodland': return "Got a tiny human nearby who thinks like a philosopher trapped in a jellybean body?";
      case 'mirror': return "Just vibing solo?";
      default: return "";
    }
  };

  // Define the description text based on category
  const getDescriptionText = () => {
    switch(id) {
      case 'twilight': return "Romantic connection starters, deep cuts, and curveballs to spark unforgettable first dates.";
      case 'lovers': return "This premium deck unlocks tasteful, vulnerable, and playful intimacy.";
      case 'sunlit': return "This category brings laughter, party mode games, and bond with a stranger challenges.";
      case 'brainstorm': return "Explore fun riddles, what-ifs, ethical dilemmas, and party-style debate prompts.";
      case 'woodland': return "Bond with kids (or teens) in ways that matter.";
      case 'mirror': return "This is your daily conversation with the realest person you know—yourself. Includes gratitude check-ins and personal growth prompts.";
      default: return description;
    }
  };

  // Helper function to get the correct route based on category ID
  const getCategoryRoute = (categoryId: string): string => {
    switch(categoryId) {
      case 'twilight':
        return '/twilight-tides';
      case 'lovers':
        return '/lovers-lantern';
      case 'sunlit': 
        return '/sunlit-social';
      case 'brainstorm':
      case 'woodland':
      case 'mirror':
      default:
        // Temporarily fall back to the generic route until we create all dedicated pages
        return `/category/${categoryId}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="category-card rounded-3xl overflow-hidden shadow-soft bg-white border border-gray-100 hover:border-gray-300 flex flex-col h-full"
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
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-700 text-sm">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-50 text-purple-400 text-xs rounded-full flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
        </div>
        <div className="mb-6 flex-grow">
          <p className="italic text-sm text-gray-500 mb-3 border-l-2 pl-3 border-gray-200">
            {getPromptText()}
          </p>
          <div className="space-y-2">
            <p className="text-gray-700 text-base">
              {getDescriptionText()}
            </p>
            <p className="font-accent text-sm text-gray-600 mt-1">
              "{quote}"
            </p>
          </div>
        </div>
        <Link 
          href={getCategoryRoute(id)} 
          className="block w-full py-3 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-white text-center font-medium hover:shadow-md transition-all"
        >
          Start Your Journey
        </Link>
      </div>
    </motion.div>
  );
}
