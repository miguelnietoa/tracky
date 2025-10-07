import { z } from "zod"

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
})

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").optional(),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters").optional(),
  contactName: z.string().min(2, "Contact name must be at least 2 characters").optional(),
  communityName: z.string().min(2, "Community name must be at least 2 characters").optional(),
  leaderName: z.string().min(2, "Leader name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, "You must agree to the terms"),
  newsletter: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Campaign schemas
export const campaignSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(50, "Description must be at least 50 characters").max(1000, "Description must be less than 1000 characters"),
  category: z.enum(["cleanup", "reforestation", "restoration", "education", "conservation", "renewable"]),
  location: z.string().min(5, "Please provide a specific location"),
  startDate: z.date({
    required_error: "Start date is required",
  }).refine(date => date >= new Date(), "Start date must be in the future"),
  endDate: z.date({
    required_error: "End date is required",
  }),
  maxParticipants: z.number().min(1, "Must allow at least 1 participant").max(10000, "Maximum 10,000 participants"),
  tokenReward: z.number().min(1, "Token reward must be at least 1").max(1000, "Maximum 1,000 tokens per participant"),
  requireApplication: z.boolean().default(false),
  enableTracking: z.boolean().default(true),
  impactMetrics: z.array(z.object({
    name: z.string().min(1, "Metric name is required"),
    unit: z.string().min(1, "Unit is required"),
    target: z.string().min(1, "Target value is required"),
  })).min(1, "At least one impact metric is required"),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after start date",
  path: ["endDate"],
})

// Discussion schemas
export const discussionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(200, "Title must be less than 200 characters"),
  content: z.string().min(20, "Content must be at least 20 characters").max(5000, "Content must be less than 5000 characters"),
  category: z.enum(["organization", "impact", "technology", "resources", "success-stories", "help"]),
  tags: z.array(z.string()).max(5, "Maximum 5 tags allowed"),
})

// Profile schemas
export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().max(50, "Twitter handle must be less than 50 characters").optional(),
  linkedin: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
})

// Search and filter schemas
export const searchSchema = z.object({
  query: z.string().max(100, "Search query must be less than 100 characters").optional(),
  category: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.enum(["recent", "popular", "answered", "unanswered"]).optional(),
  timeframe: z.enum(["24h", "7d", "30d", "90d"]).optional(),
})

// Comment schema
export const commentSchema = z.object({
  content: z.string().min(5, "Comment must be at least 5 characters").max(1000, "Comment must be less than 1000 characters"),
  parentId: z.string().optional(),
})

// Types derived from schemas
export type LoginData = z.infer<typeof loginSchema>
export type SignUpData = z.infer<typeof signUpSchema>
export type CampaignData = z.infer<typeof campaignSchema>
export type DiscussionData = z.infer<typeof discussionSchema>
export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>
export type SearchData = z.infer<typeof searchSchema>
export type CommentData = z.infer<typeof commentSchema>