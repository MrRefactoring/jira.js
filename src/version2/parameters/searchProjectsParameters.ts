import { z } from 'zod';
import { StringListSchema } from './stringList';

export const SearchProjectsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.number().int().optional(),
  /**
   * The maximum number of items to return per page. Must be less than or equal to 100. If a value greater than 100 is
   * provided, the `maxResults` parameter will default to 100.
   */
  maxResults: z.number().int().optional(),
  /**
   * [Order](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#ordering) the results by a field.
   *
   * - `category` Sorts by project category. A complete list of category IDs is found using [Get all project
   *   categories](#api-rest-api-2-projectCategory-get).
   * - `issueCount` Sorts by the total number of issues in each project.
   * - `key` Sorts by project key.
   * - `lastIssueUpdatedTime` Sorts by the last issue update time.
   * - `name` Sorts by project name.
   * - `owner` Sorts by project lead.
   * - `archivedDate` EXPERIMENTAL. Sorts by project archived date.
   * - `deletedDate` EXPERIMENTAL. Sorts by project deleted date.
   */
  orderBy: z
    .enum([
      'category',
      '-category',
      '+category',
      'key',
      '-key',
      '+key',
      'name',
      '-name',
      '+name',
      'owner',
      '-owner',
      '+owner',
      'issueCount',
      '-issueCount',
      '+issueCount',
      'lastIssueUpdatedDate',
      '-lastIssueUpdatedDate',
      '+lastIssueUpdatedDate',
      'archivedDate',
      '+archivedDate',
      '-archivedDate',
      'deletedDate',
      '+deletedDate',
      '-deletedDate',
    ])
    .optional(),
  /**
   * The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For
   * example, `id=10000&id=10001`. Up to 50 project IDs can be provided.
   */
  id: z.array(z.number().int()).optional(),
  /**
   * The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For
   * example, `keys=PA&keys=PB`. Up to 50 project keys can be provided.
   */
  keys: z.array(z.string()).optional(),
  /**
   * Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case
   * insensitive).
   */
  query: z.string().optional(),
  /**
   * Orders results by the [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes). This
   * parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`.
   */
  typeKey: z.string().optional(),
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-2-projectCategory-get) operation.
   */
  categoryId: z.number().int().optional(),
  /**
   * Filter results by projects for which the user can:
   *
   * - `view` the project, meaning that they have one of the following permissions:
   *
   *   - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *   - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *   - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - `browse` the project, meaning that they have the _Browse projects_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   * - `edit` the project, meaning that they have one of the following permissions:
   *
   *   - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   *   - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - `create` the project, meaning that they have the _Create issues_ [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for the project in which the issue is created.
   */
  action: z.enum(['view', 'browse', 'edit', 'create']).optional(),
  /**
   * Use [expand](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#expansion) to include additional
   * information in the response. This parameter accepts a comma-separated list. Expanded options include:
   *
   * - `description` Returns the project description.
   * - `projectKeys` Returns all project keys associated with a project.
   * - `lead` Returns information about the project lead.
   * - `issueTypes` Returns all issue types associated with the project.
   * - `url` Returns the URL associated with the project.
   * - `insight` EXPERIMENTAL. Returns the insight details of total issue count and last issue update time for the
   *   project.
   */
  expand: z.string().optional(),
  /**
   * EXPERIMENTAL. Filter results by project status:
   *
   * - `live` Search live projects.
   * - `archived` Search archived projects.
   * - `deleted` Search deleted projects, those in the recycle bin.
   */
  status: z.array(z.enum(['live', 'archived', 'deleted'])).optional(),
  /**
   * EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated
   * list.
   */
  properties: z.array(StringListSchema).optional(),
  /**
   * EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object.
   * For example, to search for the value of `nested` from `{"something":{"nested":1,"other":2}}` use
   * `[thepropertykey].something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable
   * searching where the propertyQuery key includes dot (.) or equals (=) characters. Note that `thepropertykey` is only
   * returned when included in `properties`.
   */
  propertyQuery: z.string().optional(),
});

export type SearchProjectsParameters = z.infer<typeof SearchProjectsParametersSchema>;
