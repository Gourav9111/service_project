import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLoanApplicationSchema, insertDSAPartnerSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  };

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
      
      res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Create admin user (for initial setup)
  app.post("/api/admin/setup", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        role: "admin"
      });

      res.json({ message: "Admin user created successfully", userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Loan application routes
  app.post("/api/loan-applications", async (req, res) => {
    try {
      const validatedData = insertLoanApplicationSchema.parse(req.body);
      const application = await storage.createLoanApplication(validatedData);
      res.json(application);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.get("/api/loan-applications", authenticateToken, async (req, res) => {
    try {
      const applications = await storage.getLoanApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get("/api/loan-applications/:type", authenticateToken, async (req, res) => {
    try {
      const { type } = req.params;
      const applications = await storage.getLoanApplicationsByType(type);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch("/api/loan-applications/:id/status", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status required" });
      }

      const updated = await storage.updateLoanApplicationStatus(id, status);
      if (!updated) {
        return res.status(404).json({ message: "Application not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // DSA Partner routes
  app.post("/api/dsa-partners", async (req, res) => {
    try {
      const validatedData = insertDSAPartnerSchema.parse(req.body);
      const partner = await storage.createDSAPartner(validatedData);
      res.json(partner);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.get("/api/dsa-partners", authenticateToken, async (req, res) => {
    try {
      const partners = await storage.getDSAPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch("/api/dsa-partners/:id/kyc", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "KYC status required" });
      }

      const updated = await storage.updateDSAPartnerKYC(id, status);
      if (!updated) {
        return res.status(404).json({ message: "Partner not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  app.patch("/api/dsa-partners/:id/status", authenticateToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { isActive } = req.body;
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "Active status required" });
      }

      const updated = await storage.updateDSAPartnerStatus(id, isActive);
      if (!updated) {
        return res.status(404).json({ message: "Partner not found" });
      }

      res.json(updated);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // DSA Partner login
  app.post("/api/dsa/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }

      const partner = await storage.getDSAPartnerByEmail(email);
      
      if (!partner || !partner.password || !await bcrypt.compare(password, partner.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (!partner.isActive) {
        return res.status(401).json({ message: "Account deactivated" });
      }

      const token = jwt.sign({ id: partner.id, email: partner.email, role: "dsa" }, JWT_SECRET, { expiresIn: '24h' });
      
      res.json({ token, partner: { id: partner.id, name: partner.name, email: partner.email, kycStatus: partner.kycStatus } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
