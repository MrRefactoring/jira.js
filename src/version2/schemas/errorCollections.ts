import { z } from 'zod';

export const ErrorCollectionsSchema = z.object({});

export type ErrorCollections = z.infer<typeof ErrorCollectionsSchema>;
