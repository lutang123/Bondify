import { users, type User, type InsertUser, Category, Question, categories, questions } from "@shared/schema";
import { categories as categoriesData } from "@/lib/data";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getQuestionsByCategoryId(categoryId: string): Promise<Question[]>;
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
        favoriteQuestions: []
      })
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
      
      console.log("Database seeding completed.");
    } else {
      console.log("Database already contains data, skipping seed.");
    }
  }
}

// Initialize storage
export const storage = new DatabaseStorage();
