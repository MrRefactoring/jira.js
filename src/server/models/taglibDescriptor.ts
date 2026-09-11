import { z } from 'zod';
import { apiObject } from '#/core';

export const TaglibDescriptorSchema = apiObject({
  taglibLocation: z.string().optional(),
  taglibURI: z.string().optional(),
});

export type TaglibDescriptor = z.infer<typeof TaglibDescriptorSchema>;
