import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertConversationPackSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const allCategories = await storage.getAllCategories();
      res.json(allCategories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.get("/api/questions/:categoryId", async (req: Request, res: Response) => {
    try {
      const questions = await storage.getQuestionsByCategoryId(req.params.categoryId);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const newUser = await storage.createUser(validatedData);
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  // Conversation Packs routes
  
  // Get all conversation packs
  app.get("/api/conversation-packs", async (_req: Request, res: Response) => {
    try {
      const packs = await storage.getAllConversationPacks();
      res.json(packs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversation packs" });
    }
  });
  
  // Get the weekly conversation pack
  app.get("/api/conversation-packs/weekly", async (_req: Request, res: Response) => {
    try {
      const pack = await storage.getWeeklyConversationPack();
      if (!pack) {
        return res.status(404).json({ message: "No weekly conversation pack available" });
      }
      res.json(pack);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch weekly conversation pack" });
    }
  });
  
  // Get featured conversation packs
  app.get("/api/conversation-packs/featured", async (_req: Request, res: Response) => {
    try {
      const packs = await storage.getFeaturedConversationPacks();
      res.json(packs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured conversation packs" });
    }
  });
  
  // Get a specific conversation pack by ID
  app.get("/api/conversation-packs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid pack ID" });
      }
      
      const pack = await storage.getConversationPackById(id);
      if (!pack) {
        return res.status(404).json({ message: "Conversation pack not found" });
      }
      res.json(pack);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch conversation pack" });
    }
  });
  
  // Get questions for a specific conversation pack
  app.get("/api/conversation-packs/:id/questions", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid pack ID" });
      }
      
      const questions = await storage.getQuestionsByPackId(id);
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pack questions" });
    }
  });
  
  // Create a new conversation pack (admin only)
  app.post("/api/conversation-packs", async (req: Request, res: Response) => {
    try {
      // In a real app, you would check for admin permissions here
      const validatedData = insertConversationPackSchema.parse(req.body);
      const newPack = await storage.createConversationPack(validatedData);
      res.status(201).json(newPack);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid pack data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create conversation pack" });
    }
  });
  
  // Add questions to a conversation pack (admin only)
  app.post("/api/conversation-packs/:id/questions", async (req: Request, res: Response) => {
    try {
      // In a real app, you would check for admin permissions here
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid pack ID" });
      }
      
      const { questions } = req.body;
      if (!Array.isArray(questions) || questions.length === 0) {
        return res.status(400).json({ message: "Questions must be provided as a non-empty array" });
      }
      
      const newQuestions = await storage.addQuestionsToConversationPack(id, questions);
      res.status(201).json(newQuestions);
    } catch (error) {
      res.status(500).json({ message: "Failed to add questions to pack" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
