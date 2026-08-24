import type { z } from 'zod';
import { apiObject } from '#/core';

export const AttachmentSchema = apiObject({});

export type Attachment = z.infer<typeof AttachmentSchema>;
