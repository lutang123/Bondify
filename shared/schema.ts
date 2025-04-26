import { pgTable, text, serial, integer, boolean, jsonb, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isPremium: boolean("is_premium").default(false),
  favoriteQuestions: jsonb("favorite_questions").default([]),
  unlockedPacks: jsonb("unlocked_packs").default([]),
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
  packId: integer("pack_id").references(() => conversationPacks.id),
});

// Weekly Conversation Packs model
export const conversationPacks = pgTable("conversation_packs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  expertName: text("expert_name").notNull(),
  expertTitle: text("expert_title").notNull(),
  expertAvatar: text("expert_avatar"),
  releaseDate: date("release_date").notNull(),
  theme: text("theme").notNull(),
  isPremium: boolean("is_premium").default(true),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories);

export const insertQuestionSchema = createInsertSchema(questions);

export const insertConversationPackSchema = createInsertSchema(conversationPacks).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;

export type InsertConversationPack = z.infer<typeof insertConversationPackSchema>;
export type ConversationPack = typeof conversationPacks.$inferSelect;
