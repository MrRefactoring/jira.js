import { z } from 'zod';
import { SharePermissionInputSchema } from '../models';

export const AddSharePermissionSchema = z.object(SharePermissionInputSchema.shape).extend({
  /** The ID of the filter. */
  id: z.number(),
});

export type AddSharePermission = z.input<typeof AddSharePermissionSchema>;
