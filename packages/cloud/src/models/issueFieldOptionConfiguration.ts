import { z } from 'zod';
import { IssueFieldOptionScopeSchema } from '#/models/issueFieldOptionScope';

/** Details of the projects the option is available in. */
export const IssueFieldOptionConfigurationSchema = z.object({
  /** DEPRECATED */
  attributes: z.array(z.enum(['notSelectable', 'defaultValue'])).optional(),
  scope: IssueFieldOptionScopeSchema.optional(),
});

export type IssueFieldOptionConfiguration = z.infer<typeof IssueFieldOptionConfigurationSchema>;
