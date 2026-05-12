import { JQLReferenceDataSchema, type JQLReferenceData } from '#/models/jQLReferenceData';
import { AutoCompleteSuggestionsSchema, type AutoCompleteSuggestions } from '#/models/autoCompleteSuggestions';
import { ParsedJqlQueriesSchema, type ParsedJqlQueries } from '#/models/parsedJqlQueries';
import { ConvertedJQLQueriesSchema, type ConvertedJQLQueries } from '#/models/convertedJQLQueries';
import { type GetAutoCompletePost } from '#/parameters/getAutoCompletePost';
import { type GetFieldAutoCompleteForQueryString } from '#/parameters/getFieldAutoCompleteForQueryString';
import { type ParseJqlQueries } from '#/parameters/parseJqlQueries';
import { type MigrateQueries } from '#/parameters/migrateQueries';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
 * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
 * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information
 * to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query
 * builder.
 *
 * To filter visible field details by project or collapse non-unique fields by field type then [Get field reference data
 * (POST)](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-autocompletedata-post)
 * can be used.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAutoComplete(client: Client): Promise<JQLReferenceData> {
  const config: SendRequestOptions<JQLReferenceData> = {
    url: '/rest/api/3/jql/autocompletedata',
    method: 'GET',
    schema: JQLReferenceDataSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
 * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
 * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information
 * to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query
 * builder.
 *
 * This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored.
 * System fields are always returned.
 *
 * It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across all
 * fields with the same name and of the same field type. For example, the collapsed field `Component -
 * Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and `Component - cf[10062]` to be searched
 * simultaneously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAutoCompletePost(client: Client, parameters: GetAutoCompletePost): Promise<JQLReferenceData> {
  const config: SendRequestOptions<JQLReferenceData> = {
    url: '/rest/api/3/jql/autocompletedata',
    method: 'POST',
    body: {
      includeCollapsedFields: parameters.includeCollapsedFields,
      projectIds: parameters.projectIds,
    },
    schema: JQLReferenceDataSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the JQL search auto complete suggestions for a field.
 *
 * Suggestions can be obtained by providing:
 *
 * - `fieldName` to get a list of all values for the field.
 * - `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.
 * - `fieldName` and `predicateName` to get a list of all predicate values for the field.
 * - `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in
 *   `predicateValue`.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getFieldAutoCompleteForQueryString(
  client: Client,
  parameters?: GetFieldAutoCompleteForQueryString,
): Promise<AutoCompleteSuggestions> {
  const config: SendRequestOptions<AutoCompleteSuggestions> = {
    url: '/rest/api/3/jql/autocompletedata/suggestions',
    method: 'GET',
    searchParams: {
      fieldName: parameters?.fieldName,
      fieldValue: parameters?.fieldValue,
      predicateName: parameters?.predicateName,
      predicateValue: parameters?.predicateValue,
    },
    schema: AutoCompleteSuggestionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Parses and validates JQL queries.
 *
 * Validation is performed in context of the current user.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function parseJqlQueries(client: Client, parameters: ParseJqlQueries): Promise<ParsedJqlQueries> {
  const config: SendRequestOptions<ParsedJqlQueries> = {
    url: '/rest/api/3/jql/parse',
    method: 'POST',
    searchParams: {
      validation: parameters.validation,
    },
    body: {
      queries: parameters.queries,
    },
    schema: ParsedJqlQueriesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account
 * IDs.
 *
 * You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For
 * more information about GDPR-related changes, see the [migration
 * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function migrateQueries(client: Client, parameters: MigrateQueries): Promise<ConvertedJQLQueries> {
  const config: SendRequestOptions<ConvertedJQLQueries> = {
    url: '/rest/api/3/jql/pdcleaner',
    method: 'POST',
    body: {
      queryStrings: parameters.queryStrings,
    },
    schema: ConvertedJQLQueriesSchema,
  };

  return await client.sendRequest(config);
}
