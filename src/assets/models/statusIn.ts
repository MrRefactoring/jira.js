import { z } from 'zod';
import { apiObject } from '#/core';

export const StatusInSchema = apiObject({
  name: z.string(),
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
