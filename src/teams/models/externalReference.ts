import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const ExternalReferenceSchema = apiObject({
  id: z.string(),
  source: openEnum(['ATLASSIAN_GROUP']),
});

export type ExternalReference = z.infer<typeof ExternalReferenceSchema>;
