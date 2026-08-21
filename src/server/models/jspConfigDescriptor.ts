import { z } from 'zod';
import { apiObject } from '#/core';
import { JspPropertyGroupDescriptorSchema } from './jspPropertyGroupDescriptor';
import { TaglibDescriptorSchema } from './taglibDescriptor';

export const JspConfigDescriptorSchema = apiObject({
  jspPropertyGroups: z.array(JspPropertyGroupDescriptorSchema).optional(),
  taglibs: z.array(TaglibDescriptorSchema).optional(),
});

export type JspConfigDescriptor = z.infer<typeof JspConfigDescriptorSchema>;
