import { 
  users, type User, type InsertUser, Category, Question, categories, questions,
  conversationPacks, type ConversationPack, type InsertConversationPack
} from "@shared/schema";
import { categories as categoriesData } from "@/lib/data";
import { db } from "./db";
import { eq, and, gte, desc, sql } from "drizzle-orm";

// Storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPremiumStatus(userId: number, isPremium: boolean): Promise<User>;
  
  // Category methods
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  
  // Question methods
  getQuestionsByCategoryId(categoryId: string): Promise<Question[]>;
  getQuestionsByPackId(packId: number): Promise<Question[]>;
  
  // Conversation Pack methods
  getAllConversationPacks(): Promise<ConversationPack[]>;
  getConversationPackById(id: number): Promise<ConversationPack | undefined>;
  getWeeklyConversationPack(): Promise<ConversationPack | undefined>;
  getFeaturedConversationPacks(): Promise<ConversationPack[]>;
  createConversationPack(pack: InsertConversationPack): Promise<ConversationPack>;
  addQuestionsToConversationPack(packId: number, questions: string[]): Promise<Question[]>;
  
  // Initialization
  seedDatabase(): Promise<void>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ 
        ...insertUser,
        isPremium: false,
        favoriteQuestions: [],
        unlockedPacks: []
      })
      .returning();
    return user;
  }
  
  async updateUserPremiumStatus(userId: number, isPremium: boolean): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ isPremium })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getAllCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getQuestionsByCategoryId(categoryId: string): Promise<Question[]> {
    return db.select().from(questions).where(eq(questions.categoryId, categoryId));
  }
  
  async getQuestionsByPackId(packId: number): Promise<Question[]> {
    return db.select().from(questions).where(eq(questions.packId, packId));
  }
  
  async getAllConversationPacks(): Promise<ConversationPack[]> {
    return db.select().from(conversationPacks).orderBy(desc(conversationPacks.releaseDate));
  }
  
  async getConversationPackById(id: number): Promise<ConversationPack | undefined> {
    const [pack] = await db.select().from(conversationPacks).where(eq(conversationPacks.id, id));
    return pack || undefined;
  }
  
  async getWeeklyConversationPack(): Promise<ConversationPack | undefined> {
    // Get current date in YYYY-MM-DD format for comparisons
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Find the most recent pack that is active
    const [latestPack] = await db
      .select()
      .from(conversationPacks)
      .where(
        and(
          eq(conversationPacks.isActive, true),
          sql`${conversationPacks.releaseDate} <= ${currentDate}`
        )
      )
      .orderBy(desc(conversationPacks.releaseDate))
      .limit(1);
      
    return latestPack;
  }
  
  async getFeaturedConversationPacks(): Promise<ConversationPack[]> {
    return db
      .select()
      .from(conversationPacks)
      .where(eq(conversationPacks.isFeatured, true))
      .orderBy(desc(conversationPacks.releaseDate));
  }
  
  async createConversationPack(pack: InsertConversationPack): Promise<ConversationPack> {
    const [newPack] = await db
      .insert(conversationPacks)
      .values(pack)
      .returning();
    return newPack;
  }
  
  async addQuestionsToConversationPack(packId: number, questionTexts: string[]): Promise<Question[]> {
    // First get the pack to verify it exists
    const pack = await this.getConversationPackById(packId);
    if (!pack) {
      throw new Error(`Conversation pack with id ${packId} not found`);
    }
    
    // Insert the questions
    const insertedQuestions: Question[] = [];
    for (const text of questionTexts) {
      const [question] = await db
        .insert(questions)
        .values({
          text,
          packId,
          // Since pack questions don't belong to a category, we'll use a default one
          categoryId: 'lovers', // Using Lover's Lantern as default category for pack questions
          isPremium: pack.isPremium
        })
        .returning();
      
      insertedQuestions.push(question);
    }
    
    return insertedQuestions;
  }

  async seedDatabase(): Promise<void> {
    // Check if we have any categories already
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      console.log("Seeding database with initial categories and questions...");
      
      // Seed categories
      for (const cat of categoriesData) {
        // Insert category
        await db.insert(categories).values({
          id: cat.id,
          name: cat.name,
          subtitle: cat.subtitle,
          description: cat.description,
          quote: cat.quote,
          imageUrl: cat.imageUrl,
          isPremium: cat.isPremium || false
        });
        
        // Insert questions for this category
        for (const questionText of cat.sampleQuestions) {
          await db.insert(questions).values({
            categoryId: cat.id,
            text: questionText,
            isPremium: cat.isPremium || false
          });
        }
      }
      
      // Check if we have any conversation packs
      const existingPacks = await db.select().from(conversationPacks);
      
      if (existingPacks.length === 0) {
        console.log("Seeding database with initial conversation packs...");
        
        // Create a few sample conversation packs
        const packs = [
          {
            title: "Building Trust",
            description: "This curated pack focuses on questions that help build trust between partners, friends, or family members through vulnerability and honesty.",
            expertName: "Dr. Sarah Johnson",
            expertTitle: "Relationship Therapist",
            expertAvatar: "https://randomuser.me/api/portraits/women/42.jpg",
            releaseDate: new Date().toISOString().split('T')[0], // Today
            theme: "Trust & Vulnerability",
            isPremium: true,
            isActive: true,
            isFeatured: true
          },
          {
            title: "Shared Dreams",
            description: "Explore life goals and aspirations with your loved ones through these thoughtfully designed questions about the future.",
            expertName: "Marcus Chen",
            expertTitle: "Life Coach & Author",
            expertAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
            releaseDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // One week ago
            theme: "Future Planning",
            isPremium: true,
            isActive: true,
            isFeatured: false
          },
          {
            title: "Childhood Memories",
            description: "Connect through nostalgia and formative experiences with questions that explore your most treasured childhood memories.",
            expertName: "Dr. Lisa Patel",
            expertTitle: "Family Psychologist",
            expertAvatar: "https://randomuser.me/api/portraits/women/63.jpg",
            releaseDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Two weeks ago
            theme: "Nostalgia & Memory",
            isPremium: true,
            isActive: true,
            isFeatured: false
          }
        ];
        
        for (const packData of packs) {
          // Create the pack
          const [pack] = await db.insert(conversationPacks).values(packData).returning();
          
          // Add some questions to each pack
          const packQuestions = [
            // Questions for "Building Trust" pack
            ...(packData.title === "Building Trust" ? [
              "What's something you're afraid to tell me because you worry it might change how I see you?",
              "When have you felt most supported by me, and when have you felt I've let you down?",
              "What's one secret you've kept because you're worried about being judged?",
              "What are three things you think we should be more honest with each other about?",
              "What's the hardest thing for you to be vulnerable about, and why?",
              "How can I make you feel safer sharing difficult truths with me?",
              "What's something you need from this relationship that you haven't been getting?",
              "What promise do you want me to make to you that would strengthen our trust?"
            ] : []),
            
            // Questions for "Shared Dreams" pack
            ...(packData.title === "Shared Dreams" ? [
              "If we could build a life anywhere in the world, where would you want it to be and why?",
              "What's one dream you've never told anyone about but still hope to achieve?",
              "How do you envision our relationship evolving over the next five years?",
              "What's one experience you hope we can share together in the future?",
              "If money wasn't a concern, what would our ideal life look like?",
              "What are three values you hope we always maintain as we grow together?",
              "What legacy do you hope to leave behind, and how can I support that vision?", 
              "What's one fear you have about our future that we should address now?"
            ] : []),
            
            // Questions for "Childhood Memories" pack
            ...(packData.title === "Childhood Memories" ? [
              "What's your earliest happy memory, and why has it stayed with you?",
              "Who was your childhood hero, and how did they shape who you are today?",
              "What family tradition from your childhood do you miss the most?",
              "What's one thing you loved about your childhood that you want to recreate?",
              "Was there a moment in your childhood when you felt particularly loved or valued?",
              "What game or activity from your childhood would you love to share with me?",
              "What's one difficult childhood memory that you think I should know about?",
              "How did your parents show love in your family, and how has that affected how you give and receive love now?"
            ] : [])
          ];
          
          for (const questionText of packQuestions) {
            await db.insert(questions).values({
              text: questionText,
              categoryId: 'lovers', // Default category for pack questions
              isPremium: true,
              packId: pack.id
            });
          }
        }
        
        console.log("Conversation packs seeding completed.");
      }
      
      console.log("Database seeding completed.");
    } else {
      console.log("Database already contains data, skipping seed.");
    }
  }
}

// Initialize storage
export const storage = new DatabaseStorage();
