import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shuffle, Check, ChevronRight, Home } from "lucide-react";
import { categories } from "@/lib/data";

// Brainstorm Blitz specific questions focused on thought-provoking discussions
const brainstormQuestions = [
  // Mind-Bending What-Ifs
  "If you could download one skill directly into your brain, what would it be and how would you use it?",
  "If you could have a conversation with any version of yourself (past or future), which age would you choose and what would you ask?",
  "If humans suddenly couldn't lie, which institution would collapse first?",
  "If you could redesign humans to have one new physical feature, what would you add and why?",
  "If you could safely teleport but there was a 1% chance of ending up somewhere random, would you use it regularly?",
  "If animals could vote, which species would elect the most reasonable government?",
  "If you could see one statistic floating above everyone's head, what would you want to know?",
  "If your brain could be perfectly replicated in a computer, would that consciousness be 'you'?",
  "If you were given the ability to speak every language but would lose one of your five senses, would you take the deal?",
  "If you could live in a simulation of any era with complete safety, which time period would you choose?",
  
  // Ethical Dilemmas & Deep Thought
  "Should advanced AI systems have any rights or protections? At what point would they deserve them?",
  "Is it more ethical to donate a large sum to one effective cause or smaller amounts to many different causes?",
  "If you could genetically modify your future child to prevent a disease but also enhance their intelligence, where would you draw the line?",
  "Would you rather live in a world with no lies or no secrets?",
  "Are humans obligated to preserve species that would naturally go extinct without human intervention?",
  "Would you approve a technology that could end all mental illness, but which would also remove the highest emotional peaks?",
  "If a digital copy of your consciousness could live forever in a virtual paradise, would you consider the real you to be immortal?",
  "Do you think true altruism exists, or is every good deed motivated by something self-serving?",
  "Should people inherit the debt of their deceased parents?",
  "Is there a moral obligation to boycott art made by people who have done terrible things?",
  
  // Curiosity & Knowledge
  "What's something you firmly believed for years before learning it was false?",
  "What's a question you'd like to know the answer to but you're unlikely to ever find out?",
  "What scientific advancement would change human society the most if it happened tomorrow?",
  "What's an idea you agree with but most people in your social circle don't?",
  "What's a question that, when asked, usually reveals a lot about the person who answers it?",
  "What assumptions do you think future generations will find most bizarre about how we live today?",
  "Which profession do you think is most overrated? Most underrated?",
  "What rare experience have you had that most people will never experience?",
  "What's the most interesting unsolved mystery to you?",
  "What's a piece of knowledge that seems useless but has actually benefited you?",
  
  // Debate Starters
  "Would you rather reset the internet to how it was in 2005 or keep it as it is now?",
  "Is it better to be highly specialized or broadly knowledgeable?",
  "Would it be better for humans to have shorter but more intense lives or much longer but more subdued experiences?",
  "Is it more important to help your family or to help the greater society when those goals conflict?",
  "Which era in the past hundred years had the best culture?",
  "When does privacy matter more than transparency, and vice versa?",
  "Which would benefit society more: everyone taking a year off from social media or everyone spending a year without travel?",
  "Would you rather have extremely good luck but everyone dislikes you, or be universally loved but have terrible luck?",
  "Is it better to be first or to be best?",
  "Would you rather be the worst player on a championship team or the best player on a losing team?"
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
        <span className="font-medium text-orange-600">Data Reset</span>
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
      <span className="font-medium text-orange-600">+{amount} XP</span>
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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center mb-4">
            <span className="text-white text-xl font-bold">?</span>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Tap to Reveal</h3>
          <p className="text-gray-600">A thought-provoking question awaits...</p>
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
                {isAnswered ? 'Discussed' : 'Mark Discussed'}
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
              className="rounded-full bg-gradient-to-r from-orange-400 to-amber-400 hover:opacity-90 text-white"
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

export default function BrainstormBlitzPage() {
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
  
  const category = categories.find(cat => cat.id === 'brainstorm');
  
  // Reset all data for this category
  const resetCategoryData = () => {
    // Clear localStorage items for this category
    localStorage.removeItem(`favorites-brainstorm`);
    localStorage.removeItem(`answered-brainstorm`);
    localStorage.removeItem(`xp-brainstorm`);
    
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
    // Initialize cards with Brainstorm Blitz specific questions
    setCards(brainstormQuestions);
    
    // TEMPORARY: Reset all localStorage data on page load
    resetCategoryData();
    
    // Comment out the loading code for now to ensure we start fresh
    /*
    // Load favorites and answered questions from localStorage
    const storedFavorites = localStorage.getItem(`favorites-brainstorm`);
    const storedAnswered = localStorage.getItem(`answered-brainstorm`);
    const storedXp = localStorage.getItem(`xp-brainstorm`);
    
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
      localStorage.setItem(`favorites-brainstorm`, JSON.stringify(favorites));
    }
    
    if (answered.length > 0) {
      localStorage.setItem(`answered-brainstorm`, JSON.stringify(answered));
    }
    
    if (xp > 0) {
      localStorage.setItem(`xp-brainstorm`, xp.toString());
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
      setXp(prev => prev + 5);
      
      // Show XP notification
      setXpAction("discussing question");
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
    <div className="min-h-screen bg-gradient-to-br from-orange-700 via-amber-800 to-yellow-900 bg-fixed overflow-hidden">
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
          <div className="h-3 w-3 rounded-full bg-orange-400"></div>
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
              className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-400" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/70">
            <span>{answered.length} discussed</span>
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
            className="px-6 py-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white flex items-center shadow-lg"
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