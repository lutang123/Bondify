import { users, type User, type InsertUser, Category, Question } from "@shared/schema";
import { categories as categoriesData } from "@/lib/data";

// Storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getQuestionsByCategoryId(categoryId: string): Promise<Question[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<string, Category>;
  private questions: Map<number, Question>;
  private currentUserId: number;
  private currentQuestionId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.questions = new Map();
    this.currentUserId = 1;
    this.currentQuestionId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    categoriesData.forEach(cat => {
      const category: Category = {
        id: cat.id,
        name: cat.name,
        subtitle: cat.subtitle,
        description: cat.description,
        quote: cat.quote,
        imageUrl: cat.imageUrl,
        isPremium: cat.isPremium || false
      };
      this.categories.set(cat.id, category);

      // Initialize questions for this category
      cat.sampleQuestions.forEach(questionText => {
        const questionId = this.currentQuestionId++;
        const question: Question = {
          id: questionId,
          categoryId: cat.id,
          text: questionText,
          isPremium: cat.isPremium || false
        };
        this.questions.set(questionId, question);
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isPremium: false,
      favoriteQuestions: []
    };
    this.users.set(id, user);
    return user;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getQuestionsByCategoryId(categoryId: string): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (question) => question.categoryId === categoryId
    );
  }
}

// Initialize storage
export const storage = new MemStorage();
