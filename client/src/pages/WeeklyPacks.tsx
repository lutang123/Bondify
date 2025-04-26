import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Calendar, User, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getQueryFn } from "@/lib/queryClient";
import { ConversationPack, Question } from "@shared/schema";
import { Link } from "wouter";

export default function WeeklyPacks() {
  // Fetch the current weekly pack
  const weeklyPackQuery = useQuery({
    queryKey: ["/api/conversation-packs/weekly"],
    queryFn: getQueryFn<ConversationPack>({ on401: "returnNull" }),
  });

  // If we have a pack, fetch its questions
  const packQuestionsQuery = useQuery({
    queryKey: [`/api/conversation-packs/${weeklyPackQuery.data?.id}/questions`],
    queryFn: getQueryFn<Question[]>({ on401: "returnNull" }),
    enabled: !!weeklyPackQuery.data?.id, // Only run if we have a pack ID
  });

  // Fetch all previous packs
  const previousPacksQuery = useQuery({
    queryKey: ["/api/conversation-packs"],
    queryFn: getQueryFn<ConversationPack[]>({ on401: "returnNull" }),
  });

  // Filter out the current weekly pack from the previous packs
  const previousPacks = previousPacksQuery.data?.filter(
    (pack) => pack.id !== weeklyPackQuery.data?.id
  ).sort((a, b) => {
    // Sort by release date (most recent first)
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  }).slice(0, 3); // Get only the 3 most recent packs

  const isLoading = 
    weeklyPackQuery.isLoading || 
    (weeklyPackQuery.data && packQuestionsQuery.isLoading);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16"
    >
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-8 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] gradient-text px-2">
              Weekly Expert-Curated Conversation Packs
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover thoughtfully crafted conversation topics from relationship experts, 
              updated every week to spark meaningful connections.
            </p>
          </header>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[hsl(var(--lovers))]" />
              <span className="ml-3 text-lg">Loading this week's conversation pack...</span>
            </div>
          ) : weeklyPackQuery.data ? (
            <div className="mb-8 md:mb-16">
              <div className="flex flex-wrap items-center mb-4 gap-2">
                <Badge variant="secondary" className="text-[hsl(var(--lovers))] bg-[hsl(var(--lovers))]/10">
                  This Week's Pack
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Released on {formatDate(weeklyPackQuery.data.releaseDate)}</span>
                </div>
              </div>
              
              <Card className="border border-purple-100 shadow-md overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 bg-gradient-to-br from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] p-6 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {weeklyPackQuery.data.title}
                      </h2>
                      <p className="text-white/90 mb-4">
                        {weeklyPackQuery.data.description}
                      </p>
                      <div className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm font-medium text-white">
                        {weeklyPackQuery.data.theme}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center">
                        <Avatar className="border-2 border-white">
                          <AvatarImage src={weeklyPackQuery.data.expertAvatar || ""} alt={weeklyPackQuery.data.expertName} />
                          <AvatarFallback className="bg-white/20 text-white">
                            {weeklyPackQuery.data.expertName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <h3 className="text-white font-medium">{weeklyPackQuery.data.expertName}</h3>
                          <p className="text-white/80 text-sm">{weeklyPackQuery.data.expertTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 p-6">
                    <div className="flex items-center mb-4">
                      <BookOpen className="text-[hsl(var(--lovers))] w-5 h-5 mr-2" />
                      <h3 className="text-xl font-medium text-gray-800">Featured Questions</h3>
                    </div>
                    
                    {packQuestionsQuery.isLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                      </div>
                    ) : packQuestionsQuery.data && packQuestionsQuery.data.length > 0 ? (
                      <ul className="space-y-3 mb-6">
                        {packQuestionsQuery.data.slice(0, 5).map((question, index) => (
                          <li key={question.id} className="p-3 rounded-lg border border-purple-100 hover:border-purple-200 transition-colors">
                            <p className="text-gray-800">{question.text}</p>
                          </li>
                        ))}
                        
                        {packQuestionsQuery.data.length > 5 && (
                          <div className="text-center text-gray-500 text-sm mt-2">
                            + {packQuestionsQuery.data.length - 5} more questions
                          </div>
                        )}
                      </ul>
                    ) : (
                      <p className="text-gray-500 py-4">No questions available for this pack.</p>
                    )}
                    
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] text-white">
                        Unlock Premium Pack
                      </Button>
                    </div>
                    
                    <p className="text-center text-gray-500 text-sm mt-4">
                      Available exclusively for Bondify Club members
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No weekly pack available right now. Check back soon!</p>
          )}

          {/* Previous Packs */}
          {previousPacks && previousPacks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Previous Packs</h2>
                {previousPacksQuery.data && previousPacksQuery.data.length > 3 && (
                  <Button variant="ghost" className="text-[hsl(var(--lovers))] text-sm md:text-base">
                    View all
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {previousPacks.map(pack => (
                  <Card key={pack.id} className="border border-gray-100 hover:border-purple-200 transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-gray-800">{pack.title}</CardTitle>
                          <CardDescription className="text-gray-500 flex items-center mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(pack.releaseDate)}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-gray-50">
                          {pack.theme}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-gray-600 line-clamp-3">{pack.description}</p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={pack.expertAvatar || ""} alt={pack.expertName} />
                            <AvatarFallback className="bg-[hsl(var(--lovers))]/10 text-[hsl(var(--lovers))] text-xs">
                              {pack.expertName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-2 text-sm text-gray-600">{pack.expertName}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-[hsl(var(--lovers))]">
                          View pack
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {/* Call to action */}
          <div className="mt-12 md:mt-20 text-center px-4">
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Want to Access All Exclusive Packs?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Join the Bondify Club today to unlock all weekly conversation packs, save your favorites, 
              and get access to premium features.
            </p>
            <Link href="/join-club">
              <Button className="bg-gradient-to-r from-[hsl(var(--lovers))] to-[hsl(var(--twilight))] text-white px-6 py-4 md:px-8 md:py-6 text-base md:text-lg">
                Join Bondify Club
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}