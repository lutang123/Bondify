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
  // Function to get button style - more sophisticated, subtle palette
  function getButtonGradient(id: string): string {
    // Use a more consistent, refined palette across all categories
    // with just subtle differences for each category
    const baseGradient = 'bg-gradient-to-r from-slate-600 to-slate-700';
    
    // We'll use subtle border colors as accents instead of changing the whole button background
    switch(id) {
      case 'twilight':
        return `${baseGradient} border border-pink-200/40`;
      case 'lovers':
        return `${baseGradient} border border-purple-200/40`;
      case 'sunlit':
        return `${baseGradient} border border-amber-200/40`;
      case 'brainstorm':
        return `${baseGradient} border border-orange-200/40`;
      case 'woodland':
        return `${baseGradient} border border-emerald-200/40`;
      case 'mirror':
        return `${baseGradient} border border-blue-200/40`;
      default:
        return `${baseGradient} border border-slate-400/40`;
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

  // Function to get overlay gradient based on category id - more mature, subtle tones
  function getOverlayGradient(id: string): string {
    // Use a more consistent, sophisticated darker gradient
    // that allows text to pop but keeps the colors subdued
    return 'bg-gradient-to-t from-slate-900/70 via-slate-800/40 to-transparent';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="category-card rounded-2xl overflow-hidden shadow-md bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300 ease-in-out"
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
          <h3 className="font-accent text-2xl font-bold text-white drop-shadow-lg text-left">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-700 text-sm">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-50 text-purple-400 text-xs rounded-full flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Premium
            </span>
          )}
        </div>
        {/* Extract the intro question/prompt to make it stand out */}
        <p className="text-gray-900 font-medium mb-3 text-base leading-snug">
          {id === 'twilight' ? "Don't believe in love at first sight? Try this." :
           id === 'lovers' ? "Curious about your partner's spicy secrets?" :
           id === 'sunlit' ? "In a bar or meetup and everyone's glued to their phones?" :
           id === 'brainstorm' ? "Up for some mental gymnastics?" :
           id === 'woodland' ? "Got a tiny human nearby who thinks like a philosopher trapped in a jellybean body?" :
           id === 'mirror' ? "Just vibing solo?" : ""
          }
        </p>
        
        {/* Rest of the description */}
        <p className="text-gray-600 mb-4 text-sm">
          {id === 'twilight' ? "Romantic connection starters, deep cuts, and curveballs to spark unforgettable first dates." :
           id === 'lovers' ? "This premium deck unlocks tasteful, vulnerable, and playful intimacy." :
           id === 'sunlit' ? "This category brings laughter, party mode games, and \"bond with a stranger\" challenges." :
           id === 'brainstorm' ? "Explore fun riddles, what-ifs, ethical dilemmas, and party-style debate prompts." :
           id === 'woodland' ? "Bond with kids (or teens) in ways that matter." :
           id === 'mirror' ? "This is your daily conversation with the realest person you know—yourself. Includes gratitude check-ins and personal growth prompts." : ""
          }
        </p>
        
        {/* Quote now styled like footer text */}
        <p className="text-sm text-gray-500 mb-4 border-t border-gray-100 pt-3">
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
