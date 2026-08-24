import type { z } from 'zod';
import { apiObject } from '#/core';

export const IssueLinkTypesSchema = apiObject({});

export type IssueLinkTypes = z.infer<typeof IssueLinkTypesSchema>;
