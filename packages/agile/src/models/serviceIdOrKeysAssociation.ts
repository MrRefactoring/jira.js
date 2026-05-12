import { z } from 'zod';

/** An association type referencing service ID or keys.* */
export const ServiceIdOrKeysAssociationSchema = z.object({
  /** Defines the association type. */
  associationType: z.enum(['serviceIdOrKeys']),
  /**
   * The service ID or keys to associate the entity with.
   *
   * The number of values counted across all associationTypes must not exceed a limit of 500.
   */
  values: z.array(z.string().max(255, 'values must be at most 255 characters')),
});

export type ServiceIdOrKeysAssociation = z.infer<typeof ServiceIdOrKeysAssociationSchema>;
