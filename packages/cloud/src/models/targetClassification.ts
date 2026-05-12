import { z } from 'zod';

/** Classification mapping for classifications in source issues to respective target classification. */
export const targetClassificationSchema = z.object({
  /**
   * An object with the key as the ID of the target classification and value with the list of the IDs of the current
   * source classifications.
   */
  classifications: z.record(z.string(), z.any()),
  /** ID of the source issueType to which issues present in `issueIdOrKeys` belongs. */
  issueType: z.string().optional(),
  /** ID or key of the source project to which issues present in `issueIdOrKeys` belongs. */
  projectKeyOrId: z.string().optional(),
});

export type targetClassification = z.infer<typeof targetClassificationSchema>;
