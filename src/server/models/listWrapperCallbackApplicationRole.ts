import type { z } from 'zod';
import { apiObject } from '#/core';

export const ListWrapperCallbackApplicationRoleSchema = apiObject({});

export type ListWrapperCallbackApplicationRole = z.infer<typeof ListWrapperCallbackApplicationRoleSchema>;
