import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { IssueFieldOptionScopeSchema } from './issueFieldOptionScope';
/** Details of the projects the option is available in. */

export const IssueFieldOptionConfigurationSchema = apiObject({
  /** DEPRECATED */
  attributes: z.array(openEnum(['notSelectable', 'defaultValue'])).optional(),
  scope: IssueFieldOptionScopeSchema.optional(),
});

export type IssueFieldOptionConfiguration = z.infer<typeof IssueFieldOptionConfigurationSchema>;
