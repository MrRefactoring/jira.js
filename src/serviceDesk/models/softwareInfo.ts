import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';
import { DateSchema } from './date';

export const SoftwareInfoSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  /** Reference of the change set included in the build. */
  buildChangeSet: z.string().optional(),
  buildDate: DateSchema.optional(),
  /** Indicates whether the instance is licensed (true) or not (false). */
  isLicensedForUse: z.boolean().optional(),
  /** Jira Platform version upon which Service Desk is based. */
  platformVersion: z.string().optional(),
  /** Jira Service Management version. */
  version: z.string().optional(),
});

export type SoftwareInfo = z.infer<typeof SoftwareInfoSchema>;
