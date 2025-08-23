import { z } from 'zod';

/** Details of the projects the option is available in. */
export const IssueFieldOptionConfigurationSchema = z.object({
  /** DEPRECATED */
  attributes: z.array(z.enum(['notSelectable', 'defaultValue'])).optional(),
  /**
   * Defines the projects that the option is available in. If the scope is not defined, then the option is available in
   * all projects.
   */
  scope: z.unknown().optional(),
});

export type IssueFieldOptionConfiguration = z.infer<typeof IssueFieldOptionConfigurationSchema>;
