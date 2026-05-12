import { z } from 'zod';

/** Represents an association between a field and its operations. */
export const UpdateFieldAssociationsRequestItemSchema = z.object({
  /**
   * (optional) Work types to restrict field to. Replaces any existing work type associations for the field. If not
   * provided, the field is associated to any work types.
   */
  restrictedToWorkTypes: z.array(z.number()).optional(),
  /** Scheme IDs to associate field with */
  schemeIds: z.array(z.number()),
});

export type UpdateFieldAssociationsRequestItem = z.infer<typeof UpdateFieldAssociationsRequestItemSchema>;
