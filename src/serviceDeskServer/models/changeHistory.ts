import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';
import { HistoryMetadataSchema } from './historyMetadata';
import { ChangeItemSchema } from './changeItem';

export const ChangeHistorySchema = apiObject({
  author: UserJsonSchema.optional(),
  created: z.coerce.date().optional(),
  historyMetadata: HistoryMetadataSchema.optional(),
  id: z.string().optional(),
  items: z.array(ChangeItemSchema).optional(),
});

export type ChangeHistory = z.infer<typeof ChangeHistorySchema>;
