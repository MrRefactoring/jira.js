import { z } from 'zod';
import { apiObject } from '#/core';

export const AvatarCroppingSchema = apiObject({
  cropperOffsetX: z.number().optional(),
  cropperOffsetY: z.number().optional(),
  cropperWidth: z.number().optional(),
  needsCropping: z.boolean().optional(),
  url: z.string().optional(),
});

export type AvatarCropping = z.infer<typeof AvatarCroppingSchema>;
