import { z } from 'zod';
import { RequestTypePermissionRequestSchema } from '../models';

export const UpsertRequestTypePermissionSchema = z.object(RequestTypePermissionRequestSchema.shape).extend({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
  /** The id of the request type. */
  requestTypeId: z.string(),
});

export type UpsertRequestTypePermission = z.input<typeof UpsertRequestTypePermissionSchema>;
