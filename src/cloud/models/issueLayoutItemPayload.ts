import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
/** Defines the payload to configure the issue layout item for a project. */

export const IssueLayoutItemPayloadSchema = apiObject({
  itemKey: ProjectCreateResourceIdentifierSchema.optional(),
  /** Additional properties for this item. This field is only used when the type is FIELD. */
  properties: z.record(z.string(), z.any()).optional(),
  /** The item section type */
  sectionType: openEnum(['content', 'primaryContext', 'secondaryContext']).optional(),
  /** The item type. Currently only support FIELD */
  type: openEnum(['FIELD']).optional(),
});

export type IssueLayoutItemPayload = z.infer<typeof IssueLayoutItemPayloadSchema>;
