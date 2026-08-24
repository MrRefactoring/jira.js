import { z } from 'zod';
import { apiObject } from '#/core';
import { HistoryMetadataParticipantSchema } from './historyMetadataParticipant';

export const HistoryMetadataSchema = apiObject({
  activityDescription: z.string().optional(),
  activityDescriptionKey: z.string().optional(),
  actor: HistoryMetadataParticipantSchema.optional(),
  cause: HistoryMetadataParticipantSchema.optional(),
  description: z.string().optional(),
  descriptionKey: z.string().optional(),
  emailDescription: z.string().optional(),
  emailDescriptionKey: z.string().optional(),
  extraData: z.record(z.string(), z.any()).optional(),
  generator: HistoryMetadataParticipantSchema.optional(),
  type: z.string().optional(),
});

export type HistoryMetadata = z.infer<typeof HistoryMetadataSchema>;
