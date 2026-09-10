import { z } from 'zod';

export const ScimConfigurationDocumentSchema = z.record(z.string(), z.unknown());

export type ScimConfigurationDocument = z.infer<typeof ScimConfigurationDocumentSchema>;
