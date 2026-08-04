import { z } from 'zod';
import { openEnum } from '#/core';

export const GetAccessibleProjectTypeByKeySchema = z.object({
  /** The key of the project type. */
  projectTypeKey: openEnum(['software', 'service_desk', 'business', 'product_discovery']),
});

export type GetAccessibleProjectTypeByKey = z.input<typeof GetAccessibleProjectTypeByKeySchema>;
