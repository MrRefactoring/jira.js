import type { CustomFieldPayload } from './customFieldPayload';
import type { FieldLayoutSchemePayload } from './fieldLayoutSchemePayload';
import type { FieldLayoutPayload } from './fieldLayoutPayload';
import type { IssueLayoutPayload } from './issueLayoutPayload';
import type { IssueTypeScreenSchemePayload } from './issueTypeScreenSchemePayload';
import type { ScreenSchemePayload } from './screenSchemePayload';
import type { ScreenPayload } from './screenPayload';

/**
 * Defines the payload for the fields, screens, screen schemes, issue type screen schemes, field layouts, and field
 * layout schemes
 */
export interface FieldCapabilityPayload {
  /**
   * The custom field definitions. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-post
   */
  customFieldDefinitions?: CustomFieldPayload[];
  fieldLayoutScheme?: FieldLayoutSchemePayload;
  /** The field layouts configuration. */
  fieldLayouts?: FieldLayoutPayload[];
  /** The issue layouts configuration */
  issueLayouts?: IssueLayoutPayload[];
  issueTypeScreenScheme?: IssueTypeScreenSchemePayload;
  /**
   * The screen schemes See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-rest-api-3-screenscheme-post
   */
  screenScheme?: ScreenSchemePayload[];
  /**
   * The screens. See
   * https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-rest-api-3-screens-post
   */
  screens?: ScreenPayload[];
}
