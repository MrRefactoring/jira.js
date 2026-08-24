import type { z } from 'zod';
import { apiObject } from '#/core';

export const VoteSchema = apiObject({});

export type Vote = z.infer<typeof VoteSchema>;
