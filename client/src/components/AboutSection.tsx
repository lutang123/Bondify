import { motion } from "framer-motion";
import { MessageCircle, Heart, Users } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-[hsl(var(--bubble-100))]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-accent text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            Why We Made Bondify
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            In a world drowning in shallow scrolling and AI chatter, we're bringing back the art of real human connection.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-soft text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-[hsl(var(--twilight))]/10 rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-[hsl(var(--twilight))]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Meaningful Talk</h3>
            <p className="text-gray-600">
              We believe in conversations that matter, not just small talk that fades.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-soft text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-[hsl(var(--lovers))]/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-[hsl(var(--lovers))]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Human Connection</h3>
            <p className="text-gray-600">
              Technology should bring people closer, not replace human relationships.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-soft text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-[hsl(var(--sunlit))]/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-[hsl(var(--sunlit))]" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-gray-800">Playful Discovery</h3>
            <p className="text-gray-600">
              We turn awkward silences into moments of fun, curiosity, and genuine bonding.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
