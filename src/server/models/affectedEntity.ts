import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const AffectedEntitySchema = apiObject({
  description: z.string().optional(),
  numberOfOccurrences: z.number().optional(),
  type: openEnum(['ANONYMIZE', 'TRANSFER_OWNERSHIP', 'REMOVE', 'MANUAL']).optional(),
  uri: z.string().optional(),
  uriDisplayName: z.string().optional(),
});

export type AffectedEntity = z.infer<typeof AffectedEntitySchema>;
