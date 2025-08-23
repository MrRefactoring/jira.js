import { z } from 'zod';
import { ProjectIssueCreateMetadataSchema } from './projectIssueCreateMetadata';

/** The wrapper for the issue creation metadata for a list of projects. */
export const IssueCreateMetadataSchema = z.object({
  /** Expand options that include additional project details in the response. */
  expand: z.string().optional(),
  /** List of projects and their issue creation metadata. */
  projects: z.array(ProjectIssueCreateMetadataSchema).optional(),
});

export type IssueCreateMetadata = z.infer<typeof IssueCreateMetadataSchema>;
