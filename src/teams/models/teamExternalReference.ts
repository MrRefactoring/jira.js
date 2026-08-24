import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const TeamExternalReferenceSchema = apiObject({
  id: z.string(),
  source: openEnum(['ATLASSIAN_GROUP', 'HRIS']),
});

export type TeamExternalReference = z.infer<typeof TeamExternalReferenceSchema>;
