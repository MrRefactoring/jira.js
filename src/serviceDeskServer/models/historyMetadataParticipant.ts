import { z } from 'zod';
import { apiObject } from '#/core';

export const HistoryMetadataParticipantSchema = apiObject({
  avatarUrl: z.string().optional(),
  displayName: z.string().optional(),
  displayNameKey: z.string().optional(),
  id: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
});

export type HistoryMetadataParticipant = z.infer<typeof HistoryMetadataParticipantSchema>;
