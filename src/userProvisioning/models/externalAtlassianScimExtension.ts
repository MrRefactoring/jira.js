import { z } from 'zod';
import { apiObject } from '#/core';

export const ExternalAtlassianScimExtensionSchema = apiObject({
  atlassianAccountId: z.string().optional(),
});

export type ExternalAtlassianScimExtension = z.infer<typeof ExternalAtlassianScimExtensionSchema>;
