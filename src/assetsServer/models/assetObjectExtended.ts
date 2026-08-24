import { z } from 'zod';
import { apiObject } from '#/core';

export const AssetObjectExtendedSchema = apiObject({
  openIssuesExists: z.boolean().optional(),
  attachmentsExists: z.boolean().optional(),
});

export type AssetObjectExtended = z.infer<typeof AssetObjectExtendedSchema>;
