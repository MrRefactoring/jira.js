import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldCreateMetadataSchema } from './fieldCreateMetadata';

export const PaginatedResponseFieldCreateMetadataSchema = apiObject({
  maxResults: z.number().optional(),
  results: z.array(FieldCreateMetadataSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseFieldCreateMetadata = z.infer<typeof PaginatedResponseFieldCreateMetadataSchema>;
