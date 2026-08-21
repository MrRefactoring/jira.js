import { z } from 'zod';
import { apiObject } from '#/core';
/** An Assets status type that can be associated with objects */

export const StatusSchema = apiObject({
  id: z.string(),
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

export type Status = z.infer<typeof StatusSchema>;
