import { z } from 'zod';
import { FieldCreateMetadataSchema } from './fieldCreateMetadata';

export const PaginatedResponseFieldCreateMetadataSchema = z.object({
  maxResults: z.number().int().optional(),
  results: z.array(FieldCreateMetadataSchema).optional(),
  startAt: z.number().int().optional(),
  total: z.number().int().optional(),
});

export type PaginatedResponseFieldCreateMetadata = z.infer<typeof PaginatedResponseFieldCreateMetadataSchema>;
