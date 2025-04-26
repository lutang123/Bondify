import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Heart, Shuffle, Check, ChevronRight, Star } from "lucide-react";
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
  colors: any;
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
  colors, 
  isFlipped, 
  onFlip, 
  isFavorite, 
  onFavorite, 
  isAnswered, 
  onAnswer,
  onNext
}: QuestionCardProps) {
  return (
    <div className="perspective-1000 w-full max-w-md mx-auto h-64 cursor-pointer">
      <motion.div
        className={`relative w-full h-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Card Front */}
        <div 
          className={`absolute w-full h-full backface-hidden rounded-2xl ${colors.bgLight} border-2 ${colors.border} shadow-soft flex items-center justify-center`}
          onClick={onFlip}
        >
          <div className="text-center p-6">
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2,
                repeatType: "reverse"
              }}
            >
              <Star className={`h-16 w-16, mx-auto mb-4 ${colors.text}`} />
            </motion.div>
            <h3 className={`text-xl font-medium ${colors.text}`}>Tap to reveal question</h3>
            <p className="text-gray-500 text-sm mt-2">Take turns answering for best results</p>
          </div>
        </div>

        {/* Card Back */}
        <div 
          className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white border-2 ${colors.border} shadow-md p-6 flex flex-col`}
        >
          <div className="flex-grow flex items-center justify-center">
            <p className="text-lg font-medium text-gray-800 text-center">
              {question}
            </p>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 hover:bg-red-50`}
              onClick={onFavorite}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`${isAnswered ? `${colors.text} ${colors.bgLight}` : 'text-gray-400 hover:bg-gray-100'}`}
              onClick={onAnswer}
            >
              <Check className="h-5 w-5 mr-1" />
              {isAnswered ? "Answered" : "Mark answered"}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className={`text-gray-600 hover:${colors.text} hover:${colors.bgLight}`}
              onClick={onNext}
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
  const [favorites, setFavorites] = useState<number[]>([]);
  const [answered, setAnswered] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  
  const category = categories.find(cat => cat.id === id);
  
  useEffect(() => {
    // Initialize cards based on category
    if (category) {
      // For Twilight Tides, use extended questions
      const questions = id === 'twilight' 
        ? [...extendedQuestions]
        : [...category.sampleQuestions];
      
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
  
  // Function to get color classes based on category id
  function getCategoryColors(id: string) {
    switch(id) {
      case 'twilight':
        return {
          bg: 'bg-pink-500',
          bgLight: 'bg-pink-100',
          text: 'text-pink-500',
          border: 'border-pink-300',
          gradientFrom: 'from-pink-300',
          gradientTo: 'to-pink-500'
        };
      case 'lovers':
        return {
          bg: 'bg-purple-500',
          bgLight: 'bg-purple-100',
          text: 'text-purple-500',
          border: 'border-purple-300',
          gradientFrom: 'from-purple-300',
          gradientTo: 'to-purple-500'
        };
      case 'sunlit':
        return {
          bg: 'bg-yellow-400',
          bgLight: 'bg-yellow-100',
          text: 'text-yellow-500',
          border: 'border-yellow-300',
          gradientFrom: 'from-yellow-300',
          gradientTo: 'to-yellow-500'
        };
      case 'brainstorm':
        return {
          bg: 'bg-orange-400',
          bgLight: 'bg-orange-100',
          text: 'text-orange-500',
          border: 'border-orange-300',
          gradientFrom: 'from-orange-300',
          gradientTo: 'to-orange-500'
        };
      case 'woodland':
        return {
          bg: 'bg-green-400',
          bgLight: 'bg-green-100',
          text: 'text-green-500',
          border: 'border-green-300',
          gradientFrom: 'from-green-300',
          gradientTo: 'to-green-500'
        };
      case 'mirror':
        return {
          bg: 'bg-blue-400',
          bgLight: 'bg-blue-100',
          text: 'text-blue-500',
          border: 'border-blue-300',
          gradientFrom: 'from-blue-300',
          gradientTo: 'to-blue-500'
        };
      default:
        return {
          bg: 'bg-gray-500',
          bgLight: 'bg-gray-100',
          text: 'text-gray-500',
          border: 'border-gray-300',
          gradientFrom: 'from-gray-300',
          gradientTo: 'to-gray-500'
        };
    }
  }
  
  const colors = getCategoryColors(id);
  
  // Handle card actions
  const handleFlip = () => {
    setIsFlipped(true);
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
    setIsFlipped(false);
    // Add a slight delay before showing the next card
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % cards.length);
    }, 300);
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
    
    // Animation effect
    setTimeout(() => {
      setShuffle(false);
    }, 800);
  };
  
  // Calculate progress
  const progressPercentage = answered.length > 0 
    ? Math.round((answered.length / cards.length) * 100) 
    : 0;
  
  // Only show card interface for Twilight Tides category
  const showCardInterface = id === 'twilight';
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-grow"
    >
      <div className={`h-56 md:h-64 overflow-hidden relative ${colors.bgLight}`}>
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <h1 className="font-accent text-4xl font-bold text-white drop-shadow-md">{category.name}</h1>
          <p className="text-white/80 drop-shadow-md">{category.subtitle}</p>
        </div>
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 text-white bg-black/20 hover:bg-black/30"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {showCardInterface ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="max-w-xl">
                <h2 className={`text-2xl font-semibold mb-2 ${colors.text}`}>Let's start the conversation</h2>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Take turns drawing cards and answering questions to spark meaningful conversations.
                </p>
              </div>
              
              <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
                <div className={`h-3 w-3 rounded-full ${colors.bg}`}></div>
                <span className="text-sm font-medium">
                  {xp} XP earned
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="h-2 bg-gray-100 rounded-full w-full mb-1">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${colors.gradientFrom} ${colors.gradientTo}`} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{answered.length} answered</span>
                <span>{cards.length} total</span>
              </div>
            </div>
            
            <div className="relative mb-10">
              {/* Stack of cards (background decorative cards) */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-11/12 h-60 rounded-2xl bg-gray-100 rotate-1"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-11/12 h-60 rounded-2xl bg-gray-50 -rotate-1"></div>
              
              {/* Active card */}
              <motion.div
                animate={shuffle ? { 
                  rotate: [-1, 1, -1, 1, 0],
                  x: [-10, 10, -5, 5, 0], 
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {cards.length > 0 && (
                  <QuestionCard
                    question={cards[currentQuestionIndex]}
                    colors={colors}
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
            
            <div className="flex justify-center">
              <Button 
                className={`px-6 py-2 rounded-full ${colors.bg} hover:opacity-90 text-white flex items-center`}
                onClick={handleShuffle}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Shuffle & Draw New Cards
              </Button>
            </div>
            
            {favorites.length > 0 && (
              <div className="mt-12">
                <h3 className={`text-xl font-medium mb-4 ${colors.text}`}>
                  Your Favorite Questions ({favorites.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {favorites.map(index => (
                    <Card key={index} className={`border ${colors.border} shadow-soft`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Heart className="h-5 w-5 mt-1 text-red-500 fill-current" />
                          <p className="text-gray-800">
                            {cards[index]}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className={`text-2xl font-semibold mb-6 ${colors.text}`}>{category.subtitle}</h2>
            <p className="text-gray-600 mb-8 max-w-3xl">
              {category.description}
            </p>
            
            <h3 className="text-xl font-medium mb-4">Let's start the conversation</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[1, 2, 3, 4, 5].map(num => (
                <Card key={num} className={`border ${colors.border} shadow-soft`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-full ${colors.bgLight}`}>
                        <Star className={`h-5 w-5 ${colors.text}`} />
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
                className={`px-8 py-6 rounded-full ${colors.bg} hover:opacity-90 text-white`}
              >
                Show me more questions
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
