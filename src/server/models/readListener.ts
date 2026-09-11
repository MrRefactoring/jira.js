import type { z } from 'zod';
import { apiObject } from '#/core';

export const ReadListenerSchema = apiObject({});

export type ReadListener = z.infer<typeof ReadListenerSchema>;
