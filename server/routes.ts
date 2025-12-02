import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Thank you for reaching out! I'll get back to you within 1-2 business days.",
        submission: {
          id: submission.id,
          createdAt: submission.createdAt,
        }
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          error: validationError.message
        });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit form. Please try again later."
        });
      }
    }
  });

  // Admin endpoint to view submissions (optional - for your own use)
  app.get("/api/contact/submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  return httpServer;
}
