import { z } from 'zod';
import { apiObject } from '#/core';
/** An association type referencing another entity* */

export const EntityAssociationSchema = apiObject({
  /** Defines the association type. Currently supported entities can be found in this field's value enums list. */
  associationType: z.enum(['commit', 'repository']),
  /**
   * The entity keys that represent the entities to be associated. The number of values counted across all
   * associationTypes must not exceed a limit of 500.
   */
  values: z.array(
    z.union([
      apiObject({
        /** The hash for the Commit. */
        commitHash: z.string().max(255, 'commitHash must be at most 255 characters'),
        /** The ID of the Repository that the Commit belongs to. */
        repositoryId: z.string().max(255, 'repositoryId must be at most 255 characters'),
      }),
      apiObject({
        repositoryId: z.string().max(255, 'repositoryId must be at most 255 characters'),
      }),
    ]),
  ),
});

export type EntityAssociation = z.infer<typeof EntityAssociationSchema>;
