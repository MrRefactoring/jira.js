import type { z } from 'zod';
import { apiObject } from '#/core';

export const CurrentUserSchema = apiObject({});

export type CurrentUser = z.infer<typeof CurrentUserSchema>;
