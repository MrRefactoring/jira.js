import type { z } from 'zod';
import { apiObject } from '#/core';

export const ListWrapperCallbackGroupNameSchema = apiObject({});

export type ListWrapperCallbackGroupName = z.infer<typeof ListWrapperCallbackGroupNameSchema>;
