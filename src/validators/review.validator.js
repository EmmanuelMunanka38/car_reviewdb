import { z } from 'zod';

export const createReviewSchema = z.object({
  title: z.string().min(3),
  excerpt: z.string().optional(),
  manufacturer: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().gte(1886),
  content: z.any(),
  rating: z.number().min(0).max(5).optional(),
  status: z.enum(['draft', 'published']).optional(),
  specs: z.object({
    engine: z.string().optional(),
    horsepower: z.number().optional(),
    torque: z.number().optional(),
    transmission: z.string().optional(),
    drivetrain: z.string().optional(),
    fuel_type: z.string().optional(),
    fuel_economy: z.string().optional(),
    top_speed: z.string().optional(),
    acceleration: z.string().optional(),
    seating: z.number().optional(),
    price: z.number().optional()
  }).optional(),
  gallery: z.array(z.object({ image_url: z.string(), alt_text: z.string().optional(), sort_order: z.number().optional() })).optional()
});

export const updateReviewSchema = createReviewSchema.partial();
