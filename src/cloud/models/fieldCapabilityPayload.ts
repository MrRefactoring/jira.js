import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldPayloadSchema } from './customFieldPayload';
import { FieldLayoutSchemePayloadSchema } from './fieldLayoutSchemePayload';
import { FieldSchemePayloadSchema } from './fieldSchemePayload';
import { IssueLayoutPayloadSchema } from './issueLayoutPayload';
import { IssueTypeScreenSchemePayloadSchema } from './issueTypeScreenSchemePayload';
import { ScreenSchemePayloadSchema } from './screenSchemePayload';
import { ScreenPayloadSchema } from './screenPayload';
/**
 * Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field
 * layout schemes
 */

export const FieldCapabilityPayloadSchema = apiObject({
  /**
   * The custom field definitions. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
   */
  customFieldDefinitions: z.array(CustomFieldPayloadSchema).nullish(),
  fieldLayoutScheme: FieldLayoutSchemePayloadSchema.optional(),
  fieldScheme: FieldSchemePayloadSchema.optional(),
  /** The issue layouts configuration */
  issueLayouts: z.array(IssueLayoutPayloadSchema).nullish(),
  issueTypeScreenScheme: IssueTypeScreenSchemePayloadSchema.optional(),
  /**
   * The screen schemes See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-rest-api-3-screenscheme-post
   */
  screenScheme: z.array(ScreenSchemePayloadSchema).nullish(),
  /**
   * The screens. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
   */
  screens: z.array(ScreenPayloadSchema).nullish(),
});

export type FieldCapabilityPayload = z.infer<typeof FieldCapabilityPayloadSchema>;
