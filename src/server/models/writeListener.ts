import type { z } from 'zod';
import { apiObject } from '#/core';

export const WriteListenerSchema = apiObject({});

export type WriteListener = z.infer<typeof WriteListenerSchema>;
