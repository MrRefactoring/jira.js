import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';
import { SelfLinkSchema } from './selfLink';

export const SoftwareInfoSchema = apiObject({
  version: z.string().optional(),
  platformVersion: z.string().optional(),
  buildDate: DateSchema.optional(),
  buildChangeSet: z.string().optional(),
  isLicensedForUse: z.boolean().optional(),
  get_links: SelfLinkSchema.optional(),
});

export type SoftwareInfo = z.infer<typeof SoftwareInfoSchema>;
