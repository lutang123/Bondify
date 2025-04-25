import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isPremium: boolean("is_premium").default(false),
  favoriteQuestions: jsonb("favorite_questions").default([]),
});

// Category model
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  quote: text("quote").notNull(),
  imageUrl: text("image_url").notNull(),
  isPremium: boolean("is_premium").default(false),
});

// Questions model
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  categoryId: text("category_id").notNull().references(() => categories.id),
  text: text("text").notNull(),
  isPremium: boolean("is_premium").default(false),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories);

export const insertQuestionSchema = createInsertSchema(questions);

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;
