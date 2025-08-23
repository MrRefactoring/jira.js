import { z } from 'zod';
import { IssueTypeIssueCreateMetadataSchema } from './issueTypeIssueCreateMetadata';

/** Details of the issue creation metadata for a project. */
export const ProjectIssueCreateMetadataSchema = z.object({
  /** List of the project's avatars, returning the avatar size and associated URL. */
  avatarUrls: z.unknown().optional(),
  /** Expand options that include additional project issue create metadata details in the response. */
  expand: z.string().optional(),
  /** The ID of the project. */
  id: z.string().optional(),
  /** List of the issue types supported by the project. */
  issuetypes: z.array(IssueTypeIssueCreateMetadataSchema).optional(),
  /** The key of the project. */
  key: z.string().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  /** The URL of the project. */
  self: z.string().optional(),
});

export type ProjectIssueCreateMetadata = z.infer<typeof ProjectIssueCreateMetadataSchema>;
