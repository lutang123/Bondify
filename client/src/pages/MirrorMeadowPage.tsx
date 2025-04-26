import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shuffle, Check, ChevronRight, Home } from "lucide-react";
import { categories } from "@/lib/data";

// Mirror Meadow specific questions focused on self-reflection and personal growth
const mirrorQuestions = [
  // Self-Awareness
  "What's a strength you have that you often take for granted?",
  "What is a belief you hold that has been significantly challenged in the past year?",
  "What's something that used to bother you but doesn't anymore? What changed?",
  "What's a pattern you've noticed in your life that you'd like to change?",
  "What part of yourself do you feel you're still discovering?",
  "What are three words you'd use to describe yourself, and three words others might use?",
  "In what situations do you feel most like yourself?",
  "What's a hobby or interest you've always been curious about but haven't explored?",
  "What's an assumption you made about yourself that turned out to be false?",
  "What's something you're currently struggling with that you haven't shared with anyone?",
  
  // Growth & Learning
  "What's the most important lesson you've learned in the past year?",
  "What's something you know you should do but have been putting off?",
  "What's a fear you'd like to overcome, and what's one small step you could take toward facing it?",
  "What's a difficult truth you've had to accept about yourself?",
  "When have you been most proud of how you handled a difficult situation?",
  "What's something you wish you could tell your younger self?",
  "What's a skill you're working on improving right now?",
  "What's something you've changed your mind about recently?",
  "What boundaries do you need to establish or maintain in your life right now?",
  "What voices or opinions have too much influence over your decisions?",
  
  // Values & Purpose
  "What three values are most important to you, and how are they showing up in your life?",
  "When do you feel most connected to a sense of purpose or meaning?",
  "What would you do differently if no one was watching or judging you?",
  "What's something you want to be remembered for?",
  "What life experience has shaped your worldview the most?",
  "What's a small way you could add more joy to your daily routine?",
  "What's an area where your actions aren't aligning with your values?",
  "What does success look like to you, separate from others' definitions?",
  "What do you need more of in your life right now? Less of?",
  "What legacy do you hope to leave in the world?",
  
  // Gratitude & Mindfulness
  "What's something small you've noticed recently that brought you joy?",
  "What relationship in your life are you most grateful for right now?",
  "What's a challenge in your life that's also been a blessing in disguise?",
  "What's a simple pleasure you've been appreciating lately?",
  "What does your ideal morning routine look like, and how does it differ from your current one?",
  "What part of your body are you most grateful for and why?",
  "What's something in nature that filled you with wonder recently?",
  "Who has positively influenced your life that you haven't properly thanked?",
  "What's a moment from this past week you'd like to remember?",
  "What emotions have been most present for you lately, and what might they be telling you?"
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
        <span className="font-medium text-blue-600">Data Reset</span>
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
      <span className="font-medium text-blue-600">+{amount} XP</span>
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
      className="w-full max-w-md h-72 mx-auto rounded-2xl perspective-1000 cursor-pointer"
      onClick={isFlipped ? undefined : onFlip}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div 
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center bg-white shadow-lg p-6 text-center backface-hidden"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center mb-4">
            <span className="text-white text-xl font-bold">?</span>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Tap to Reflect</h3>
          <p className="text-gray-600">A journey inward awaits...</p>
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
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`rounded-full ${isAnswered ? 'bg-green-50 text-green-600 border-green-200' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAnswer();
                }}
              >
                <Check className={`h-4 w-4 mr-1 ${isAnswered ? 'text-green-600' : ''}`} />
                {isAnswered ? 'Reflected' : 'Mark Reflected'}
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
            </div>
            
            <Button 
              size="sm"
              className="rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 hover:opacity-90 text-white"
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

export default function MirrorMeadowPage() {
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
  
  const category = categories.find(cat => cat.id === 'mirror');
  
  // Reset all data for this category
  const resetCategoryData = () => {
    // Clear localStorage items for this category
    localStorage.removeItem(`favorites-mirror`);
    localStorage.removeItem(`answered-mirror`);
    localStorage.removeItem(`xp-mirror`);
    
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
    // Initialize cards with Mirror Meadow specific questions
    setCards(mirrorQuestions);
    
    // TEMPORARY: Reset all localStorage data on page load
    resetCategoryData();
    
    // Comment out the loading code for now to ensure we start fresh
    /*
    // Load favorites and answered questions from localStorage
    const storedFavorites = localStorage.getItem(`favorites-mirror`);
    const storedAnswered = localStorage.getItem(`answered-mirror`);
    const storedXp = localStorage.getItem(`xp-mirror`);
    
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
      localStorage.setItem(`favorites-mirror`, JSON.stringify(favorites));
    }
    
    if (answered.length > 0) {
      localStorage.setItem(`answered-mirror`, JSON.stringify(answered));
    }
    
    if (xp > 0) {
      localStorage.setItem(`xp-mirror`, xp.toString());
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
      setXpAction("reflecting on question");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-violet-900 bg-fixed overflow-hidden">
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
          <div className="h-3 w-3 rounded-full bg-blue-400"></div>
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
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{answered.length} reflected on</span>
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
            className="px-6 py-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white flex items-center shadow-lg"
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
              Your Favorite Reflections ({favorites.length})
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