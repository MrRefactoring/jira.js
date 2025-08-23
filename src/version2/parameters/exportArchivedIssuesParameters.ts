import { z } from 'zod';
import { DateRangeFilterRequestSchema } from './dateRangeFilterRequest';

export const ExportArchivedIssuesParametersSchema = z.object({
  /** List archived issues archived by a specified account ID. */
  archivedBy: z.array(z.string()).optional(),
  archivedDateRange: DateRangeFilterRequestSchema.optional(),
  /** List archived issues with a specified issue type ID. */
  issueTypes: z.array(z.string()).optional(),
  /** List archived issues with a specified project key. */
  projects: z.array(z.string()).optional(),
  /** List archived issues where the reporter is a specified account ID. */
  reporters: z.array(z.string()).optional(),
});

export type ExportArchivedIssuesParameters = z.infer<typeof ExportArchivedIssuesParametersSchema>;
