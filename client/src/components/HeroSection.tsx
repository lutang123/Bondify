import { motion } from "framer-motion";
import { Link } from "wouter";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/data";

const floatingCircleVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }
  }
};

export default function HeroSection() {
  return (
    <section className="pt-10 md:pt-16 pb-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 right-10 w-16 h-16 rounded-full bg-[hsl(var(--twilight))]/10"
        variants={floatingCircleVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-1/3 left-10 w-12 h-12 rounded-full bg-[hsl(var(--lovers))]/10"
        variants={floatingCircleVariants}
        animate="animate"
        transition={{ delay: 0.5 }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-[hsl(var(--sunlit))]/10"
        variants={floatingCircleVariants}
        animate="animate"
        transition={{ delay: 1 }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-8 h-8 rounded-full bg-[hsl(var(--mirror))]/10"
        variants={floatingCircleVariants}
        animate="animate"
        transition={{ delay: 1.5 }}
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--lovers))] via-[hsl(var(--twilight))] to-[hsl(var(--sunlit))] gradient-text leading-tight"
          >
            The Playful Path to Deeper Connections
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
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
            <div className="speech-bubble text-[hsl(var(--bubble-100))] p-5 shadow-bubble bg-[hsl(var(--lovers))] rounded-3xl">
              <p className="font-accent text-xl text-center">
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
