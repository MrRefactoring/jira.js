import type { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorCollectionsSchema = apiObject({});

export type ErrorCollections = z.infer<typeof ErrorCollectionsSchema>;
