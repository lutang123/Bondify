import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  
  const category = categories.find(cat => cat.id === id);
  
  if (!category) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button onClick={() => navigate("/")}>Go back home</Button>
      </div>
    );
  }
  
  const bgColorClass = `bg-${id}`;
  const textColorClass = `text-${id}`;
  const borderColorClass = `border-${id}`;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow"
    >
      <div className={`h-40 overflow-hidden relative ${bgColorClass}/10`}>
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover opacity-50"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-${id}/80 to-transparent`}></div>
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h1 className="font-accent text-3xl font-bold text-white">{category.name}</h1>
        </div>
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 text-white"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <h2 className={`text-2xl font-semibold mb-6 ${textColorClass}`}>{category.subtitle}</h2>
        <p className="text-gray-600 mb-8 max-w-3xl">
          {category.description}
        </p>
        
        <h3 className="text-xl font-medium mb-4">Let's start the conversation</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {[1, 2, 3, 4, 5].map(num => (
            <Card key={num} className={`border ${borderColorClass}/30 shadow-soft`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full bg-${id}/10`}>
                    <MessageCircle className={`h-5 w-5 text-${id}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {category.sampleQuestions[num-1] || "What's your favorite way to spend a Saturday morning?"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className={`px-8 py-6 rounded-full bg-${id} hover:bg-${id}/90 text-white`}
          >
            Show me more questions
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
