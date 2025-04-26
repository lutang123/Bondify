import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Shuffle, Check, ChevronRight, Star, Home } from "lucide-react";
import { categories } from "@/lib/data";

// Extend the sample questions for the demo
const extendedQuestions = [
  "What's something you're passionate about that most people don't know?",
  "If we could teleport anywhere for our next date, where would you choose?",
  "What was your most embarrassing moment that you can laugh about now?",
  "Do you believe in love at first sight, or should I walk by again?",
  "What are three things you couldn't live without?",
  "What's your idea of a perfect weekend?",
  "What's the most spontaneous thing you've ever done?",
  "What's your favorite food and why?",
  "What's a movie that made you cry?",
  "If you could have dinner with anyone, living or dead, who would it be?",
  "What's a skill you've always wanted to learn?",
  "What's your favorite childhood memory?",
  "What's the last book that really impacted you?",
  "What's your go-to karaoke song?",
  "What's your dream travel destination?",
  "What's something that always makes you laugh?",
  "What's the best gift you've ever received?",
  "What's your favorite way to relax after a long day?",
  "What's your coffee (or tea) order?",
  "What would your perfect day look like from start to finish?"
];

type QuestionCardProps = {
  question: string;
  isFlipped: boolean;
  onFlip: () => void;
  isFavorite: boolean;
  onFavorite: () => void;
  isAnswered: boolean;
  onAnswer: () => void;
  onNext: () => void;
};

function QuestionCard({ 
  question, 
  isFlipped, 
  onFlip, 
  isFavorite, 
  onFavorite, 
  isAnswered, 
  onAnswer,
  onNext
}: QuestionCardProps) {
  return (
    <div className="perspective-1000 w-full max-w-md mx-auto h-80 cursor-pointer">
      <motion.div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Card Front */}
        <div 
          className="absolute w-full h-full backface-hidden rounded-2xl bg-white/95 backdrop-blur-lg border border-white/30 shadow-xl flex items-center justify-center"
          onClick={onFlip}
        >
          <div className="text-center p-8">
            <h3 className="text-2xl font-medium text-purple-700 font-accent drop-shadow-sm">Tap to reveal question</h3>
            <p className="text-gray-600 text-sm mt-3">Take turns answering for best results</p>
          </div>
        </div>

        {/* Card Back */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white/95 backdrop-blur-lg border border-white/30 shadow-xl p-8 flex flex-col"
        >
          <div className="flex-grow flex items-center justify-center">
            <p className="text-xl font-medium text-gray-800 text-center leading-relaxed">
              {question}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isFavorite ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 hover:bg-red-50`}
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isAnswered ? 'text-purple-500 bg-purple-50' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-500'}`}
              onClick={(e) => {
                e.stopPropagation();
                onAnswer();
              }}
            >
              <Check className="h-5 w-5 mr-1" />
              {isAnswered ? "Answered" : "Mark answered"}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-purple-500 hover:bg-purple-50"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [_, navigate] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track if we've started the deck
  const [favorites, setFavorites] = useState<number[]>([]);
  const [answered, setAnswered] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  
  const category = categories.find(cat => cat.id === id);
  
  useEffect(() => {
    // Initialize cards based on category
    if (category) {
      // For demo purposes, use extended questions for all categories
      const questions = [...extendedQuestions];
      
      // Shuffle the questions if needed
      setCards(questions);
    }
    
    // Load favorites and answered questions from localStorage
    const storedFavorites = localStorage.getItem(`favorites-${id}`);
    const storedAnswered = localStorage.getItem(`answered-${id}`);
    const storedXp = localStorage.getItem(`xp-${id}`);
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    if (storedAnswered) {
      setAnswered(JSON.parse(storedAnswered));
    }
    
    if (storedXp) {
      setXp(parseInt(storedXp, 10));
    }
  }, [category, id]);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(`favorites-${id}`, JSON.stringify(favorites));
    }
    
    if (answered.length > 0) {
      localStorage.setItem(`answered-${id}`, JSON.stringify(answered));
    }
    
    if (xp > 0) {
      localStorage.setItem(`xp-${id}`, xp.toString());
    }
  }, [favorites, answered, xp, id]);
  
  if (!category) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button onClick={() => navigate("/")}>Go back home</Button>
      </div>
    );
  }
  
  // Handle card actions
  const handleFlip = () => {
    setIsFlipped(true);
    // Mark that we've started the deck - subsequent cards won't need tapping
    if (!hasStarted) {
      setHasStarted(true);
    }
  };
  
  const handleFavorite = () => {
    if (favorites.includes(currentQuestionIndex)) {
      // Remove from favorites
      setFavorites(favorites.filter(i => i !== currentQuestionIndex));
    } else {
      // Add to favorites
      setFavorites([...favorites, currentQuestionIndex]);
    }
  };
  
  const handleAnswer = () => {
    if (!answered.includes(currentQuestionIndex)) {
      // Add to answered and give XP
      setAnswered([...answered, currentQuestionIndex]);
      setXp(prev => prev + 3);
    }
  };
  
  const handleNext = () => {
    // Add a slight delay before showing the next card
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % cards.length);
      // Automatically show the next question without requiring a tap
      // Only auto-flip if we've already started the deck
      if (hasStarted) {
        setIsFlipped(true);
      }
    }, 300);
    
    // First flip the current card back
    setIsFlipped(false);
  };
  
  const handleShuffle = () => {
    setShuffle(true);
    
    // Shuffle the cards array using Fisher-Yates algorithm
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    
    // Reset state
    setCards(shuffledCards);
    setCurrentQuestionIndex(0);
    setIsFlipped(false);
    setHasStarted(false); // Reset the started state, so first card needs tap again
    
    // Animation effect
    setTimeout(() => {
      setShuffle(false);
    }, 800);
  };
  
  // Calculate progress
  const progressPercentage = answered.length > 0 
    ? Math.round((answered.length / cards.length) * 100) 
    : 0;
  
  // Get background styles based on category
  function getCategoryBackground(id: string) {
    switch(id) {
      case 'twilight':
        return "bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900";
      case 'lovers':
        return "bg-gradient-to-br from-purple-900 via-pink-900 to-red-900";
      case 'sunlit':
        return "bg-gradient-to-br from-yellow-600 via-orange-700 to-red-800";
      case 'brainstorm':
        return "bg-gradient-to-br from-orange-700 via-amber-800 to-yellow-900";
      case 'woodland':
        return "bg-gradient-to-br from-green-800 via-emerald-900 to-teal-900";
      case 'mirror':
        return "bg-gradient-to-br from-blue-800 via-indigo-900 to-violet-900";
      default:
        return "bg-gradient-to-br from-gray-800 via-gray-900 to-black";
    }
  }
  
  const backgroundClass = getCategoryBackground(id);
  
  return (
    <div className={`min-h-screen ${backgroundClass} bg-fixed overflow-hidden`}>
      {/* Background Image with overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover opacity-30"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 pt-4 px-4 md:px-8 flex justify-between items-center">
        <Button 
          variant="ghost" 
          className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          onClick={() => navigate("/")}
        >
          <Home className="mr-2 h-4 w-4" /> Home
        </Button>
        
        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
          <div className="h-3 w-3 rounded-full bg-purple-400"></div>
          <span className="text-sm font-medium">
            {xp} XP earned
          </span>
        </div>
      </nav>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-accent text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-2">
            {category.name}
          </h1>
          <p className="text-white/80 text-lg md:text-xl drop-shadow-md max-w-2xl mx-auto">
            {category.subtitle}
          </p>
        </motion.div>
        
        {/* Progress bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="h-2 bg-white/10 backdrop-blur-sm rounded-full w-full mb-1">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{answered.length} answered</span>
            <span>{cards.length} total</span>
          </div>
        </div>
        
        {/* Card Stack */}
        <div className="relative mb-10 perspective-1500">
          {/* Stack of cards (background decorative cards) */}
          <motion.div 
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md h-72 rounded-2xl bg-white/80 backdrop-blur-sm rotate-3 shadow-xl"
            initial={{ y: 0 }}
            animate={shuffle ? { 
              y: [0, -20, 0],
              rotate: [3, -2, 3],
              scale: [1, 0.98, 1]
            } : {}}
            transition={{ duration: 0.8 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-40px)' }}
          ></motion.div>
          
          <motion.div 
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-md h-76 rounded-2xl bg-white/85 backdrop-blur-sm -rotate-2 shadow-xl"
            initial={{ y: 0 }}
            animate={shuffle ? { 
              y: [0, -30, 0],
              rotate: [-2, 4, -2],
              scale: [1, 0.95, 1]
            } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(-20px)' }}
          ></motion.div>
          
          {/* Active card */}
          <motion.div
            animate={shuffle ? { 
              y: [0, -40, 0],
              rotateZ: [-1, 3, -2, 1, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, -5, 5, 0],
              scale: [1, 0.9, 1.02, 1],
            } : {}}
            transition={{ 
              duration: 1, 
              ease: "easeInOut"
            }}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(0px)'
            }}
          >
            {cards.length > 0 && (
              <QuestionCard
                question={cards[currentQuestionIndex]}
                isFlipped={isFlipped}
                onFlip={handleFlip}
                isFavorite={favorites.includes(currentQuestionIndex)}
                onFavorite={handleFavorite}
                isAnswered={answered.includes(currentQuestionIndex)}
                onAnswer={handleAnswer}
                onNext={handleNext}
              />
            )}
          </motion.div>
        </div>
        
        {/* Shuffle button */}
        <div className="flex justify-center">
          <Button 
            className="px-6 py-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white flex items-center shadow-lg"
            onClick={handleShuffle}
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Shuffle & Draw New Cards
          </Button>
        </div>
        
        {/* Favorites section */}
        {favorites.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-xl font-medium mb-6 text-white text-center">
              Your Favorite Questions ({favorites.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {favorites.map(index => (
                <Card key={index} className="border-0 shadow-md bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="h-5 w-5 mt-1 text-red-500 fill-current flex-shrink-0" />
                      <p className="text-gray-800">
                        {cards[index]}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
