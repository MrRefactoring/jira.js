import { z } from 'zod';
import { apiObject } from '#/core';

export const PartSchema = apiObject({
  contentType: z.string().optional(),
  headerNames: z.array(z.string()).optional(),
  inputStream: z.record(z.string(), z.any()).optional(),
  name: z.string().optional(),
  size: z.number().optional(),
  submittedFileName: z.string().optional(),
});

export type Part = z.infer<typeof PartSchema>;
