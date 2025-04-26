import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shuffle, Check, ChevronRight, Home } from "lucide-react";
import { categories } from "@/lib/data";

// Lover's Lantern specific questions focused on intimacy and deeper relationships
const loversQuestions = [
  // Emotional Intimacy
  "What was the moment you knew our relationship was different or special?",
  "When do you feel most emotionally connected to me?",
  "What's something I do that makes you feel truly seen and understood?",
  "What's a vulnerability you've never shared with anyone else?",
  "What part of your life story do you want me to understand better?",
  "If we could heal one aspect of our relationship dynamics, what would it be?",
  "What's been your most meaningful apology, given or received?",
  "When was the last time you felt truly safe being completely yourself with me?",
  "What's a boundary you need to establish or maintain in our relationship?",
  "What's something you wish I knew about loving you?",
  
  // Dreams & Future
  "What's a dream for our relationship you've been afraid to share?",
  "How has your vision of our future evolved since we first met?",
  "What tradition would you like to build together that we don't have yet?",
  "If we could solve one recurring challenge in our relationship through magic, what would it be?",
  "What's a fear about our future you haven't shared with me?",
  "What support do you need from me to pursue something meaningful in your life?",
  "How would you describe the legacy of our relationship in one sentence?",
  "What lesson has our relationship taught you that you didn't expect?",
  "What's something that would make you feel more secure in our relationship?",
  "If we were writing our love story, what chapter would we be in right now?",
  
  // Desire & Connection
  "What's something you've always wanted to try with me but haven't suggested?",
  "What makes you feel most appreciated in our relationship?",
  "When do you feel most attracted to me that I might not realize?",
  "What's a non-sexual form of touch you wish we shared more often?",
  "What's the most memorable intimate moment we've shared?",
  "If you could design the perfect romantic evening for us, what would it include?",
  "What's a fantasy or desire you've been afraid to express?",
  "When was a time you felt completely at peace in our relationship?",
  "What helps you feel reconnected to me after conflict?",
  "What's something that used to bother you about our relationship that you've made peace with?",
  
  // Growth & Challenges
  "What's something difficult you've learned about yourself through our relationship?",
  "What's one way we've grown stronger by facing a challenge together?",
  "When have you felt most proud of us as a couple?",
  "What do you think is the biggest misunderstanding we have about each other?",
  "How has being with me changed your perspective on something important?",
  "What's a growth edge in our relationship we haven't addressed yet?",
  "What lesson from a past relationship have you applied with me?",
  "What's a quality you've developed more of because of our relationship?", 
  "What has surprised you most about how we've evolved together?",
  "What's something you admire about us that you'd like us to nurture more?"
];

// XP notification component
function XPNotification({ amount, action }: { amount: number; action: string }) {
  // Special case for reset notification
  if (action === "resetting data") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg p-2 px-4 shadow-lg absolute top-4 right-4 z-50 flex items-center"
      >
        <span className="font-medium text-purple-600">Data Reset</span>
        <span className="ml-2 text-gray-600">XP points cleared</span>
      </motion.div>
    );
  }
  
  // Regular XP notification
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-2 px-4 shadow-lg absolute top-4 right-4 z-50 flex items-center"
    >
      <span className="font-medium text-purple-600">+{amount} XP</span>
      <span className="ml-2 text-gray-600">for {action}</span>
    </motion.div>
  );
}

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
    <div 
      className={`w-full max-w-md h-72 mx-auto rounded-2xl perspective-1000 cursor-pointer ${isFlipped ? 'pointer-events-auto' : ''}`}
      onClick={isFlipped ? undefined : onFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div 
          className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center bg-white shadow-lg p-6 text-center backface-hidden ${isFlipped ? 'invisible' : ''}`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mb-4">
            <span className="text-white text-xl font-bold">?</span>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Tap to Reveal</h3>
          <p className="text-gray-600">A new question awaits...</p>
        </div>
        
        {/* Back of card (content) */}
        <div 
          className="absolute inset-0 bg-white shadow-lg rounded-2xl p-6 backface-hidden rotate-y-180 flex flex-col"
        >
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-xl text-gray-800 font-medium leading-relaxed">
              {question}
            </p>
          </div>
          
          <div className="pt-4 flex justify-between items-center border-t border-gray-100">
            <Button 
              variant="outline" 
              size="sm" 
              className={`rounded-full ${isAnswered ? 'bg-purple-50 text-purple-600 border-purple-200' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onAnswer();
              }}
            >
              <Check className={`h-4 w-4 mr-1 ${isAnswered ? 'text-purple-600' : ''}`} />
              {isAnswered ? 'Mark Answered' : 'Mark Answered'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className={`rounded-full ${isFavorite ? 'bg-red-50 text-red-500 border-red-200' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
              {isFavorite ? 'Favorited' : 'Favorite'}
            </Button>
            
            <Button 
              size="sm"
              className="rounded-full bg-purple-500 hover:bg-purple-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoversLanternPage() {
  const [_, navigate] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // Track if we've started the deck
  const [favorites, setFavorites] = useState<number[]>([]);
  const [answered, setAnswered] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpAction, setXpAction] = useState("");
  
  const category = categories.find(cat => cat.id === 'lovers');
  
  // Reset all data for this category
  const resetCategoryData = () => {
    // Clear localStorage items for this category
    localStorage.removeItem(`favorites-lovers`);
    localStorage.removeItem(`answered-lovers`);
    localStorage.removeItem(`xp-lovers`);
    
    // Reset state
    setFavorites([]);
    setAnswered([]);
    setXp(0);
    setIsFlipped(false);
    setHasStarted(false);
    setCurrentQuestionIndex(0);
    
    // Show confirmation message
    setXpAction("resetting data");
    setShowXPNotification(true);
    setTimeout(() => setShowXPNotification(false), 2000);
  };

  useEffect(() => {
    // Initialize cards - using Lover's Lantern specific questions
    setCards(loversQuestions);
    
    // TEMPORARY: Reset all localStorage data on page load
    resetCategoryData();
    
    // Comment out the loading code for now to ensure we start fresh
    /*
    // Load favorites and answered questions from localStorage
    const storedFavorites = localStorage.getItem(`favorites-lovers`);
    const storedAnswered = localStorage.getItem(`answered-lovers`);
    const storedXp = localStorage.getItem(`xp-lovers`);
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    
    if (storedAnswered) {
      setAnswered(JSON.parse(storedAnswered));
    }
    
    if (storedXp) {
      setXp(parseInt(storedXp, 10));
    }
    */
  }, []);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem(`favorites-lovers`, JSON.stringify(favorites));
    }
    
    if (answered.length > 0) {
      localStorage.setItem(`answered-lovers`, JSON.stringify(answered));
    }
    
    if (xp > 0) {
      localStorage.setItem(`xp-lovers`, xp.toString());
    }
  }, [favorites, answered, xp]);
  
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
      // Remove from favorites and deduct XP
      setFavorites(favorites.filter(i => i !== currentQuestionIndex));
      setXp(prev => Math.max(0, prev - 5)); // Ensure XP doesn't go below 0
    } else {
      // Add to favorites and give XP
      setFavorites([...favorites, currentQuestionIndex]);
      setXp(prev => prev + 5);
      
      // Show XP notification
      setXpAction("favoriting question");
      setShowXPNotification(true);
      setTimeout(() => setShowXPNotification(false), 2000);
    }
  };
  
  const handleAnswer = () => {
    if (!answered.includes(currentQuestionIndex)) {
      // Add to answered and give XP
      setAnswered([...answered, currentQuestionIndex]);
      setXp(prev => prev + 5); // Increased from 3 to 5 XP
      
      // Show XP notification
      setXpAction("answering question");
      setShowXPNotification(true);
      setTimeout(() => setShowXPNotification(false), 2000);
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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 bg-fixed overflow-hidden">
      {/* XP Notification */}
      <AnimatePresence>
        {showXPNotification && (
          <XPNotification amount={5} action={xpAction} />
        )}
      </AnimatePresence>
      
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
      
      {/* Premium Indicator */}
      <div className="relative z-10 mx-auto max-w-xs mt-4">
        <div className="bg-gradient-to-r from-purple-300 to-pink-300 text-white text-center py-2 px-4 rounded-full shadow-lg backdrop-blur-sm">
          <span className="font-medium">✨ Premium Content</span>
        </div>
      </div>
      
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