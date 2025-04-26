import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Lock } from "lucide-react";

export default function JoinClub() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow"
    >
      <div className="bg-bubble-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-accent text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] gradient-text">
              Join the Bondify Club
            </h1>
            
            <p className="text-lg text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Upgrade your connection game with premium features that keep the conversation flowing and bring people closer together.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <Card className="border border-gray-100">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Free Forever</h2>
                  <p className="text-gray-600 mb-6">
                    Start bonding right away with our free tier features
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Browse all base-level decks</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>No sign-in needed</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Play instantly</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full" variant="outline">
                    Continue Free
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="border border-purple-500 shadow-lg relative">
                <div className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-yellow-400 text-white rounded-full py-2 px-4 font-accent transform rotate-6 shadow-md">
                  Launch Special!
                </div>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-2">Bondify Club</h2>
                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold mr-2">$1.99</span>
                    <span className="text-gray-500 line-through">$3.99</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Save progress, fav Qs</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Get weekly expert-curated convo packs</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Join exclusive Discord community</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Early access to new decks</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Get invited to IRL Bondify Socials</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Unlock premium "Lover's Lantern" deck</span>
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] text-white">
                    Upgrade Now
                  </Button>
                  
                  <p className="text-sm text-gray-500 mt-4 flex items-center justify-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Your data stays yours. We're not in the creepy data hoarding business.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
