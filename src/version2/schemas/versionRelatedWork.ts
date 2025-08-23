import { z } from 'zod';

/** Associated related work to a version */
export const VersionRelatedWorkSchema = z.object({
  /** The category of the related work */
  category: z.string(),
  /** The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API. */
  issueId: z.number().int().optional(),
  /**
   * The id of the related work. For the native release note related work item, this will be null, and Rest API does not
   * support updating it.
   */
  relatedWorkId: z.string().optional(),
  /** The title of the related work */
  title: z.string().optional(),
  /** The URL of the related work. Will be null for the native release note related work item, but is otherwise required. */
  url: z.string().optional(),
});

export type VersionRelatedWork = z.infer<typeof VersionRelatedWorkSchema>;
