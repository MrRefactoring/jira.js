import type { z } from 'zod';
import { apiObject } from '#/core';

export const BlogSchema = apiObject({});

export type Blog = z.infer<typeof BlogSchema>;
