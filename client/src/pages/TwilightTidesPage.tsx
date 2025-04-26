import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shuffle, Check, ChevronRight, Home } from "lucide-react";
import { categories } from "@/lib/data";

// Twilight Tides specific questions
const twilightQuestions = [
  // Card Front / Hidden Question format from your list
  "What's something you're passionate about that would surprise people?",
  "If we could teleport anywhere for a first adventure together, where would we go?",
  "What's a silly thing you love that you usually don't admit on a first date?",
  "If you could have a useless superpower, what would it be?",
  "Would you rather visit your childhood or your future self for 24 hours?",
  "What's your favorite way to feel cared for — words, touch, time, gifts, or acts?",
  "What was your first thought when you saw me?",
  "If you had to survive a zombie apocalypse with me, what would your role be?",
  "Tell me a random fact you love for no reason at all.",
  "If we had one night under the stars, what story would you tell me?",
  
  // Set I from your list
  "Given the choice of anyone in the world, whom would you want as a dinner guest?",
  "Would you like to be famous? In what way?",
  "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
  "What would constitute a 'perfect' day for you?",
  "When did you last sing to yourself? To someone else?",
  "If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
  "Do you have a secret hunch about how you will die?",
  "Name three things you and your partner appear to have in common.",
  "For what in your life do you feel most grateful?",
  "If you could change anything about the way you were raised, what would it be?",
  "Take four minutes and tell your partner your life story in as much detail as possible.",
  "If you could wake up tomorrow having gained any one quality or ability, what would it be?",

  // Set II from your list
  "If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?",
  "Is there something that you've dreamed of doing for a long time? Why haven't you done it?",
  "What is the greatest accomplishment of your life?",
  "What do you value most in a friendship?",
  "What is your most treasured memory?",
  "What is your most terrible memory?",
  "If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?",
  "What does friendship mean to you?",
  "What roles do love and affection play in your life?",
  "Alternate sharing something you consider a positive characteristic of your partner. Share a total of five items.",
  "How close and warm is your family? Do you feel your childhood was happier than most other people's?",
  "How do you feel about your relationship with your mother?",

  // Set III from your list
  "Make three true 'we' statements each. For instance, 'We are both in this room feeling ...'",
  "Complete this sentence: 'I wish I had someone with whom I could share ...'",
  "If you were going to become a close friend with your partner, please share what would be important for him or her to know.",
  "Tell your partner what you like about them; be very honest this time, saying things that you might not say to someone you've just met.",
  "Share with your partner an embarrassing moment in your life.",
  "When did you last cry in front of another person? By yourself?",
  "Tell your partner something that you like about them already.",
  "What, if anything, is too serious to be joked about?",
  "If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven't you told them yet?",
  "Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?",
  "Of all the people in your family, whose death would you find most disturbing? Why?",
  "Share a personal problem and ask your partner's advice on how he or she might handle it. Also, ask your partner to reflect back to you how you seem to be feeling about the problem you have chosen."
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

export default function TwilightTidesPage() {
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
  
  const category = categories.find(cat => cat.id === 'twilight');
  
  // Reset all data for this category
  const resetCategoryData = () => {
    // Clear localStorage items for this category
    localStorage.removeItem(`favorites-twilight`);
    localStorage.removeItem(`answered-twilight`);
    localStorage.removeItem(`xp-twilight`);
    
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
    // Initialize cards - using Twilight Tides specific questions
    setCards(twilightQuestions);
    
    // TEMPORARY: Reset all localStorage data on page load
    resetCategoryData();
    
    // Comment out the loading code for now to ensure we start fresh
    /*
    // Load favorites and answered questions from localStorage
    const storedFavorites = localStorage.getItem(`favorites-twilight`);
    const storedAnswered = localStorage.getItem(`answered-twilight`);
    const storedXp = localStorage.getItem(`xp-twilight`);
    
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
      localStorage.setItem(`favorites-twilight`, JSON.stringify(favorites));
    }
    
    if (answered.length > 0) {
      localStorage.setItem(`answered-twilight`, JSON.stringify(answered));
    }
    
    if (xp > 0) {
      localStorage.setItem(`xp-twilight`, xp.toString());
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
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 bg-fixed overflow-hidden">
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