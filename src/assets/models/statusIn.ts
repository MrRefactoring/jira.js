import { z } from 'zod';
import { apiObject } from '#/core';

export const StatusInSchema = apiObject({
  name: z.string(),
  displayName: z.string().max(50, 'displayName must be at most 50 characters').optional(),
  description: z.string().optional(),
  /**
   * | Name     | Value | Color  |
   * | -------- | ----- | ------ |
   * | ACTIVE   | 1     | Green  |
   * | INACTIVE | 0     | Red    |
   * | PENDING  | 2     | Yellow |
   */
  category: z.number(),
  objectSchemaId: z.string().optional(),
});

export type StatusIn = z.infer<typeof StatusInSchema>;
