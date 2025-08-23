import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
import { IssueLayoutItemPayloadSchema } from './issueLayoutItemPayload';

/** Defines the payload to configure the issue layouts for a project. */
export const IssueLayoutPayloadSchema = z.object({
  containerId: ProjectCreateResourceIdentifierSchema.optional(),
  /** The issue layout type */
  issueLayoutType: z.enum(['ISSUE_VIEW', 'ISSUE_CREATE', 'REQUEST_FORM']).optional(),
  /** The configuration of items in the issue layout */
  items: z.array(IssueLayoutItemPayloadSchema).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type IssueLayoutPayload = z.infer<typeof IssueLayoutPayloadSchema>;
