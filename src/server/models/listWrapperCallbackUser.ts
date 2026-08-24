import type { z } from 'zod';
import { apiObject } from '#/core';

export const ListWrapperCallbackUserSchema = apiObject({});

export type ListWrapperCallbackUser = z.infer<typeof ListWrapperCallbackUserSchema>;
