import { z } from 'zod';

export const SprintSchema = z.object({
  completeDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  createdDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  endDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  goal: z.string().optional(),
  id: z.number().optional(),
  name: z.string().max(30, 'name must be at most 30 characters').optional(),
  originBoardId: z.number().optional(),
  self: z.url().optional(),
  startDate: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  state: z.enum(['future', 'active', 'closed']),
});

export type Sprint = z.infer<typeof SprintSchema>;
