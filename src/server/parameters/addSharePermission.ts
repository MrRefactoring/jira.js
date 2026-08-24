import { z } from 'zod';
import { SharePermissionInputSchema } from '../models';

export const AddSharePermissionSchema = z.object(SharePermissionInputSchema.shape).extend({
  /** The filter id. */
  id: z.string(),
});

export type AddSharePermission = z.input<typeof AddSharePermissionSchema>;
