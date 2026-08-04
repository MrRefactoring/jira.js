import { z } from 'zod';

export const GetPropertySchema = z.object({
  /** The ID of the organization from which the property will be returned. */
  organizationId: z.string(),
  /** The key of the property to return. */
  propertyKey: z.string(),
});

export type GetProperty = z.input<typeof GetPropertySchema>;
