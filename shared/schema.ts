import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const loanApplications = pgTable("loan_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email"),
  city: text("city").notNull(),
  pinCode: text("pin_code"),
  loanType: text("loan_type").notNull(),
  loanAmount: decimal("loan_amount"),
  monthlySalary: decimal("monthly_salary"),
  employmentType: text("employment_type"),
  preferredTenure: integer("preferred_tenure"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dsaPartners = pgTable("dsa_partners", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  mobile: text("mobile").notNull(),
  experience: text("experience"),
  address: text("address"),
  profilePicture: text("profile_picture"),
  documents: jsonb("documents"),
  kycStatus: text("kyc_status").notNull().default("pending"),
  isActive: boolean("is_active").notNull().default(true),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const loanApplicationsRelations = relations(loanApplications, ({ one }) => ({
  // Future relations can be added here
}));

export const dsaPartnersRelations = relations(dsaPartners, ({ many }) => ({
  // Future relations can be added here
}));

export const usersRelations = relations(users, ({ many }) => ({
  // Future relations can be added here
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
});

export const insertLoanApplicationSchema = createInsertSchema(loanApplications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDSAPartnerSchema = createInsertSchema(dsaPartners).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertLoanApplication = z.infer<typeof insertLoanApplicationSchema>;
export type LoanApplication = typeof loanApplications.$inferSelect;
export type InsertDSAPartner = z.infer<typeof insertDSAPartnerSchema>;
export type DSAPartner = typeof dsaPartners.$inferSelect;
