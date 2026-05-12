import { z } from 'zod';
import { CustomFieldPayloadSchema } from '#/models/customFieldPayload';
import { FieldLayoutSchemePayloadSchema } from '#/models/fieldLayoutSchemePayload';
import { FieldSchemePayloadSchema } from '#/models/fieldSchemePayload';
import { IssueLayoutPayloadSchema } from '#/models/issueLayoutPayload';
import { IssueTypeScreenSchemePayloadSchema } from '#/models/issueTypeScreenSchemePayload';
import { ScreenSchemePayloadSchema } from '#/models/screenSchemePayload';
import { ScreenPayloadSchema } from '#/models/screenPayload';

/**
 * Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field
 * layout schemes
 */
export const FieldCapabilityPayloadSchema = z.object({
  /**
   * The custom field definitions. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
   */
  customFieldDefinitions: z.array(CustomFieldPayloadSchema).nullable().optional(),
  fieldLayoutScheme: FieldLayoutSchemePayloadSchema.optional(),
  fieldScheme: FieldSchemePayloadSchema.optional(),
  /** The issue layouts configuration */
  issueLayouts: z.array(IssueLayoutPayloadSchema).nullable().optional(),
  issueTypeScreenScheme: IssueTypeScreenSchemePayloadSchema.optional(),
  /**
   * The screen schemes See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-rest-api-3-screenscheme-post
   */
  screenScheme: z.array(ScreenSchemePayloadSchema).nullable().optional(),
  /**
   * The screens. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
   */
  screens: z.array(ScreenPayloadSchema).nullable().optional(),
});

export type FieldCapabilityPayload = z.infer<typeof FieldCapabilityPayloadSchema>;
