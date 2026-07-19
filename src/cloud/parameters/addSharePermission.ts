import { z } from 'zod';
import { SharePermissionInputSchema } from '../models';

export const AddSharePermissionSchema = z
  .object({
    /** The ID of the filter. */
    id: z.number(),
  })
  .extend(SharePermissionInputSchema.shape);

export type AddSharePermission = z.input<typeof AddSharePermissionSchema>;
