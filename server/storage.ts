import { type User, type InsertUser, type LoanApplication, type InsertLoanApplication, type DSAPartner, type InsertDSAPartner, users, loanApplications, dsaPartners } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Loan application methods
  createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication>;
  getLoanApplications(): Promise<LoanApplication[]>;
  getLoanApplicationsByType(loanType: string): Promise<LoanApplication[]>;
  updateLoanApplicationStatus(id: string, status: string): Promise<LoanApplication | undefined>;

  // DSA Partner methods
  createDSAPartner(partner: InsertDSAPartner): Promise<DSAPartner>;
  getDSAPartners(): Promise<DSAPartner[]>;
  getDSAPartnerByEmail(email: string): Promise<DSAPartner | undefined>;
  updateDSAPartnerKYC(id: string, status: string): Promise<DSAPartner | undefined>;
  updateDSAPartnerStatus(id: string, isActive: boolean): Promise<DSAPartner | undefined>;
  updateDSAPartnerPassword(id: string, password: string): Promise<DSAPartner | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
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
      .values(insertUser)
      .returning();
    return user;
  }

  // Loan application methods
  async createLoanApplication(application: InsertLoanApplication): Promise<LoanApplication> {
    const [loanApp] = await db
      .insert(loanApplications)
      .values(application)
      .returning();
    return loanApp;
  }

  async getLoanApplications(): Promise<LoanApplication[]> {
    return await db.select().from(loanApplications).orderBy(desc(loanApplications.createdAt));
  }

  async getLoanApplicationsByType(loanType: string): Promise<LoanApplication[]> {
    return await db.select().from(loanApplications)
      .where(eq(loanApplications.loanType, loanType))
      .orderBy(desc(loanApplications.createdAt));
  }

  async updateLoanApplicationStatus(id: string, status: string): Promise<LoanApplication | undefined> {
    const [updated] = await db
      .update(loanApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(loanApplications.id, id))
      .returning();
    return updated || undefined;
  }

  // DSA Partner methods
  async createDSAPartner(partner: InsertDSAPartner): Promise<DSAPartner> {
    const [dsaPartner] = await db
      .insert(dsaPartners)
      .values(partner)
      .returning();
    return dsaPartner;
  }

  async getDSAPartners(): Promise<DSAPartner[]> {
    return await db.select().from(dsaPartners).orderBy(desc(dsaPartners.createdAt));
  }

  async getDSAPartnerByEmail(email: string): Promise<DSAPartner | undefined> {
    const [partner] = await db.select().from(dsaPartners).where(eq(dsaPartners.email, email));
    return partner || undefined;
  }

  async updateDSAPartnerKYC(id: string, status: string): Promise<DSAPartner | undefined> {
    const [updated] = await db
      .update(dsaPartners)
      .set({ kycStatus: status, updatedAt: new Date() })
      .where(eq(dsaPartners.id, id))
      .returning();
    return updated || undefined;
  }

  async updateDSAPartnerStatus(id: string, isActive: boolean): Promise<DSAPartner | undefined> {
    const [updated] = await db
      .update(dsaPartners)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(dsaPartners.id, id))
      .returning();
    return updated || undefined;
  }

  async updateDSAPartnerPassword(id: string, password: string): Promise<DSAPartner | undefined> {
    const [updated] = await db
      .update(dsaPartners)
      .set({ password, updatedAt: new Date() })
      .where(eq(dsaPartners.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
