import { z } from 'zod';

/** An association type referencing another entity* */
export const EntityAssociationSchema = z.object({
  /** Defines the association type. Currently supported entities can be found in this field's value enums list. */
  associationType: z.enum(['commit', 'repository']),
  /**
   * The entity keys that represent the entities to be associated. The number of values counted across all
   * associationTypes must not exceed a limit of 500.
   */
  values: z.array(z.unknown()),
});

export type EntityAssociation = z.infer<typeof EntityAssociationSchema>;
