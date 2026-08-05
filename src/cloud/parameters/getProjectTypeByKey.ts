import { z } from 'zod';
import { openEnum } from '#/core';

export const GetProjectTypeByKeySchema = z.object({
  /** The key of the project type. */
  projectTypeKey: openEnum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetProjectTypeByKey = z.input<typeof GetProjectTypeByKeySchema>;
