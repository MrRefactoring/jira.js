import type { z } from 'zod';
import { apiObject } from '#/core';

export const VoteWatchResultSchema = apiObject({});

export type VoteWatchResult = z.infer<typeof VoteWatchResultSchema>;
