import { z } from 'zod';

/**
 * This object is used as follows:*
 *
 * In the [
 * issueLink](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLink/#api-rest-api-3-issueLink-post)
 * resource it defines and reports on the type of link between the issues. Find a list of issue link types with [Get
 * issue link
 * types](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-get).*
 * In the [
 * issueLinkType](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-post)
 * resource it defines and reports on issue link types.
 */
export const IssueLinkTypeSchema = z.object({
  /**
   * The ID of the issue link type and is used as follows:
   *
   * - In the [
   *   issueLink](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLink/#api-rest-api-3-issueLink-post)
   *   resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.
   * - In the [
   *   issueLinkType](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-post)
   *   resource it is read only.
   */
  id: z.string().optional(),
  /**
   * The description of the issue link type inward link and is used as follows:
   *
   * - In the [
   *   issueLink](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLink/#api-rest-api-3-issueLink-post)
   *   resource it is read only.
   * - In the [
   *   issueLinkType](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-post)
   *   resource it is required on create and optional on update. Otherwise, read only.
   */
  inward: z.string().optional(),
  /**
   * The name of the issue link type and is used as follows:
   *
   * - In the [
   *   issueLink](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLink/#api-rest-api-3-issueLink-post)
   *   resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.
   * - In the [
   *   issueLinkType](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-post)
   *   resource it is required on create and optional on update. Otherwise, read only.
   */
  name: z.string().optional(),
  /**
   * The description of the issue link type outward link and is used as follows:
   *
   * - In the [
   *   issueLink](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLink/#api-rest-api-3-issueLink-post)
   *   resource it is read only.
   * - In the [
   *   issueLinkType](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issueLinkType/#api-rest-api-3-issueLinkType-post)
   *   resource it is required on create and optional on update. Otherwise, read only.
   */
  outward: z.string().optional(),
  /** The URL of the issue link type. Read only. */
  self: z.url().optional(),
});

export type IssueLinkType = z.infer<typeof IssueLinkTypeSchema>;
