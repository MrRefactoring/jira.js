import { z } from 'zod';
import { CustomFieldPayloadSchema } from './customFieldPayload';
import { FieldLayoutSchemePayloadSchema } from './fieldLayoutSchemePayload';
import { FieldLayoutPayloadSchema } from './fieldLayoutPayload';
import { IssueLayoutPayloadSchema } from './issueLayoutPayload';
import { IssueTypeScreenSchemePayloadSchema } from './issueTypeScreenSchemePayload';
import { ScreenSchemePayloadSchema } from './screenSchemePayload';
import { ScreenPayloadSchema } from './screenPayload';

/**
 * Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field
 * layout schemes
 */
export const FieldCapabilityPayloadSchema = z.object({
  /**
   * The custom field definitions. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
   */
  customFieldDefinitions: z.array(CustomFieldPayloadSchema).optional(),
  fieldLayoutScheme: FieldLayoutSchemePayloadSchema.optional(),
  /** The field layouts configuration. */
  fieldLayouts: z.array(FieldLayoutPayloadSchema).optional(),
  /** The issue layouts configuration */
  issueLayouts: z.array(IssueLayoutPayloadSchema).optional(),
  issueTypeScreenScheme: IssueTypeScreenSchemePayloadSchema.optional(),
  /**
   * The screen schemes See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-rest-api-3-screenscheme-post
   */
  screenScheme: z.array(ScreenSchemePayloadSchema).optional(),
  /**
   * The screens. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
   */
  screens: z.array(ScreenPayloadSchema).optional(),
});

export type FieldCapabilityPayload = z.infer<typeof FieldCapabilityPayloadSchema>;
