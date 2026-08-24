import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * | Id  | Description |
 * | --- | ----------- |
 * | -1  | None        |
 * | 0   | Text        |
 * | 1   | Integer     |
 * | 2   | Boolean     |
 * | 3   | Double      |
 * | 4   | Date        |
 * | 5   | Time        |
 * | 6   | DateTime    |
 * | 7   | Url         |
 * | 8   | Email       |
 * | 9   | Textarea    |
 * | 10  | Select      |
 * | 11  | IP Address  |
 */

export const DefaultTypeSchema = z.discriminatedUnion('id', [
  apiObject({
    id: z.literal(-1),
    name: z.enum(['None']),
  }),
  apiObject({
    id: z.literal(0),
    name: z.enum(['Text']),
  }),
  apiObject({
    id: z.literal(1),
    name: z.enum(['Integer']),
  }),
  apiObject({
    id: z.literal(2),
    name: z.enum(['Boolean']),
  }),
  apiObject({
    id: z.literal(3),
    name: z.enum(['Double']),
  }),
  apiObject({
    id: z.literal(4),
    name: z.enum(['Date']),
  }),
  apiObject({
    id: z.literal(5),
    name: z.enum(['Time']),
  }),
  apiObject({
    id: z.literal(6),
    name: z.enum(['DateTime']),
  }),
  apiObject({
    id: z.literal(7),
    name: z.enum(['Url']),
  }),
  apiObject({
    id: z.literal(8),
    name: z.enum(['Email']),
  }),
  apiObject({
    id: z.literal(9),
    name: z.enum(['Textarea']),
  }),
  apiObject({
    id: z.literal(10),
    name: z.enum(['Select']),
  }),
  apiObject({
    id: z.literal(11),
    name: z.enum(['IP Address']),
  }),
]);

export type DefaultType = z.infer<typeof DefaultTypeSchema>;
