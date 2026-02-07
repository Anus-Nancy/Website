import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['CUSTOMER', 'PROVIDER']).default('CUSTOMER')
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const requestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  location: z.string().min(2),
  imageUrls: z.array(z.string().url()).default([]),
  schedule: z.string().datetime(),
  providerId: z.string().optional()
});

export const reviewSchema = z.object({
  providerId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3)
});

export const messageSchema = z.object({
  text: z.string().min(1).max(500)
});
