import type { z } from 'zod';
import { apiObject } from '#/core';

export const StringListSchema = apiObject({});

export type StringList = z.infer<typeof StringListSchema>;
