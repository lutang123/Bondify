import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock } from "lucide-react";

export default function ClubSection() {
  return (
    <section id="club" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[hsl(var(--lovers))]/10 to-[hsl(var(--twilight))]/10 rounded-3xl p-8 md:p-12 shadow-soft"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="font-accent text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  Join the Bondify Club
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Upgrade your connection game with premium features that keep the conversation flowing.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--lovers))] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Save progress and favorite questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--lovers))] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Weekly expert-curated conversation packs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--lovers))] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Join exclusive Discord community</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--lovers))] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Early access to new decks</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[hsl(var(--lovers))] mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Get invited to IRL Bondify Socials</span>
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="/join-club" className="w-full sm:w-auto px-8 py-3 rounded-full bg-purple-500 text-white text-center font-medium hover:shadow-md transition-all">
                    <span className="line-through text-white/80 mr-1">$3.99</span> $1.99/month
                  </Link>
                  <span className="text-sm text-gray-500 italic">Launch offer!</span>
                </div>
                
                <p className="text-sm text-gray-500 mt-4 flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  Your data stays yours. We're not in the creepy data hoarding business.
                </p>
              </div>
              
              <div className="relative">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-md animate-float"
                  style={{ animationDuration: "5s" }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                    alt="Friends connecting" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="text-purple-500 font-accent font-bold text-sm">B</span>
                      </div>
                      <span className="text-white font-medium">Join our community of connectors</span>
                    </div>
                  </div>
                </motion.div>
                
                <div className="absolute -top-4 -right-4 bg-yellow-400/90 text-white rounded-full py-2 px-4 font-accent transform rotate-6 shadow-md">
                  Launch Special!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
