import type { z } from 'zod';
import { apiObject } from '#/core';

export const ListWrapperCallbackUserJsonSchema = apiObject({});

export type ListWrapperCallbackUserJson = z.infer<typeof ListWrapperCallbackUserJsonSchema>;
