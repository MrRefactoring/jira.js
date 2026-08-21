import type { z } from 'zod';
import { apiObject } from '#/core';

export const WatchersSchema = apiObject({});

export type Watchers = z.infer<typeof WatchersSchema>;
