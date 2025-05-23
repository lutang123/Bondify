import { motion } from "framer-motion";
import { Link } from "wouter";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/data";

// Floating circle component with proper TypeScript type safety
function FloatingCircle({ 
  className, 
  delay = 0 
}: { 
  className: string;
  delay?: number;
}) {
  return (
    <motion.div 
      className={className}
      animate={{ 
        y: [0, -10, 0] 
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay 
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section className="pt-10 md:pt-16 pb-24 relative overflow-hidden">
      {/* Decorative Elements with pastel colors */}
      <FloatingCircle 
        className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-pink-300/10" 
      />
      <FloatingCircle 
        className="absolute top-1/3 left-10 w-12 h-12 rounded-full bg-purple-300/10"
        delay={0.5}
      />
      <FloatingCircle 
        className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-orange-300/10"
        delay={1}
      />
      <FloatingCircle 
        className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full bg-blue-300/10"
        delay={1.5}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-200 gradient-text leading-tight"
          >
            The Playful Path to Deeper Connections
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            In a world where most conversations are just emojis or AI replies… Bondify is your human-first, heart-forward connection booster.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto max-w-md mb-16 animate-float"
            style={{ animationDuration: "6s" }}
          >
            <div className="speech-bubble text-white p-5 shadow-bubble bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl">
              <p className="font-accent text-xl text-center drop-shadow-sm">
                Let's bondify with meaningful conversations, even ChatGPT feels jealous.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-xl md:text-2xl font-medium text-gray-700 mb-4">Choose a conversation category:</p>
        </motion.div>
        
        {/* Category Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id} 
              category={category}
              delay={index * 0.1} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
