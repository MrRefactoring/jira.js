import type { z } from 'zod';
import { apiObject } from '#/core';

export const ContentToRenderSchema = apiObject({});

export type ContentToRender = z.infer<typeof ContentToRenderSchema>;
