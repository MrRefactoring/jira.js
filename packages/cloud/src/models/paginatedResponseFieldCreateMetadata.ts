import { z } from 'zod';
import { FieldCreateMetadataSchema } from '#/models/fieldCreateMetadata';

export const PaginatedResponseFieldCreateMetadataSchema = z.object({
  maxResults: z.number().optional(),
  results: z.array(FieldCreateMetadataSchema).optional(),
  startAt: z.number().optional(),
  total: z.number().optional(),
});

export type PaginatedResponseFieldCreateMetadata = z.infer<typeof PaginatedResponseFieldCreateMetadataSchema>;
