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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="category-card rounded-3xl overflow-hidden shadow-soft bg-white border border-gray-100"
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" style={{
          backgroundColor: id === 'twilight' ? 'rgba(255, 100, 100, 0.2)' : 
                           id === 'lovers' ? 'rgba(128, 0, 128, 0.2)' : 
                           id === 'sunlit' ? 'rgba(255, 200, 0, 0.2)' : 
                           id === 'brainstorm' ? 'rgba(255, 150, 0, 0.2)' : 
                           id === 'woodland' ? 'rgba(0, 128, 0, 0.2)' : 
                           id === 'mirror' ? 'rgba(100, 150, 255, 0.2)' : 'transparent'
        }}></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-accent text-2xl font-bold text-white">{name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-gray-900">{subtitle}</h4>
          {isPremium && (
            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full flex items-center">
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
          className="block w-full py-3 rounded-full text-white text-center font-medium hover:shadow-md transition-all"
          style={{
            background: id === 'twilight' ? 'linear-gradient(to right, #ff6666, #ff4040)' : 
                         id === 'lovers' ? 'linear-gradient(to right, #9933cc, #800080)' : 
                         id === 'sunlit' ? 'linear-gradient(to right, #ffcc00, #ffaa00)' : 
                         id === 'brainstorm' ? 'linear-gradient(to right, #ff9933, #ff6600)' : 
                         id === 'woodland' ? 'linear-gradient(to right, #339966, #006633)' : 
                         id === 'mirror' ? 'linear-gradient(to right, #6699ff, #3366cc)' : 
                         'linear-gradient(to right, #666666, #333333)'
          }}
        >
          Start Your Journey
        </Link>
      </div>
    </motion.div>
  );
}
