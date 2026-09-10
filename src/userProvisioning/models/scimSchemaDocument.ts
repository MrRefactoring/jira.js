import { z } from 'zod';

export const ScimSchemaDocumentSchema = z.record(z.string(), z.unknown());

export type ScimSchemaDocument = z.infer<typeof ScimSchemaDocumentSchema>;
