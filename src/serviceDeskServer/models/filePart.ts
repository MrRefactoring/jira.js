import { z } from 'zod';
import { apiObject } from '#/core';

export const FilePartSchema = apiObject({
  contentType: z.string().optional(),
  formField: z.boolean().optional(),
  inputStream: z.record(z.string(), z.any()).optional(),
  name: z.string().optional(),
  size: z.number().optional(),
  value: z.string().optional(),
});

export type FilePart = z.infer<typeof FilePartSchema>;
