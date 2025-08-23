import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAutoCompletePostParameters } from './parameters/getAutoCompletePostParameters';
import type { GetFieldAutoCompleteForQueryStringParameters } from './parameters/getFieldAutoCompleteForQueryStringParameters';
import type { ParseJqlQueriesParameters } from './parameters/parseJqlQueriesParameters';
import type { MigrateQueriesParameters } from './parameters/migrateQueriesParameters';
import type { SanitiseJqlQueriesParameters } from './parameters/sanitiseJqlQueriesParameters';

export class JQL {
  constructor(private client: Client) {}
  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder. *
   *
   * - To filter visible field details by project or collapse non-unique fields by field type then [Get field reference
   *   data (POST)](#api-rest-api-2-jql-autocompletedata-post) can be used.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoComplete() {
    const request: Request = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder. *
   *
   * - This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored.
   *   System fields are always returned.
   * -
   * - It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across
   *   all fields with the same name and of the same field type. For example, the collapsed field `Component -
   *   Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and `Component - cf[10062]` to be searched
   *   simultaneously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoCompletePost(parameters: GetAutoCompletePostParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'POST',
      body: {
        includeCollapsedFields: parameters.includeCollapsedFields,
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the JQL search auto complete suggestions for a field. *
   *
   * - Suggestions can be obtained by providing:
   * -
   * - - `fieldName` to get a list of all values for the field.
   * - - `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.
   * - - `fieldName` and `predicateName` to get a list of all predicate values for the field.
   * - - `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in
   *       `predicateValue`.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getFieldAutoCompleteForQueryString(parameters: GetFieldAutoCompleteForQueryStringParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/autocompletedata/suggestions',
      method: 'GET',
      query: {
        fieldName: parameters.fieldName,
        fieldValue: parameters.fieldValue,
        predicateName: parameters.predicateName,
        predicateValue: parameters.predicateValue,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Parses and validates JQL queries. *
   *
   * - Validation is performed in context of the current user.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async parseJqlQueries(parameters: ParseJqlQueriesParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/parse',
      method: 'POST',
      query: {
        validation: parameters.validation,
      },
      body: {
        queries: parameters.queries,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with
   * account IDs. *
   *
   * - You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For
   *   more information about GDPR-related changes, see the [migration
   *   guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async migrateQueries(parameters: MigrateQueriesParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/pdcleaner',
      method: 'POST',
      body: {
        queryStrings: parameters.queryStrings,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to
   * view the entity. *
   *
   * - For example, if the query contains the clause _project = 'Secret project'_, and a user does not have browse
   *   permission for the project "Secret project", the sanitized query replaces the clause with _project = 12345"_
   *   (where 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If
   *   the account ID is null, sanitizing is performed for an anonymous user.
   * -
   * - Note that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers
   *   (username or user key). If you need to make queries GDPR-compliant, use [Convert user identifiers to account IDs
   *   in JQL
   *   queries](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).
   * -
   * - Before sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async sanitiseJqlQueries(parameters: SanitiseJqlQueriesParameters) {
    const request: Request = {
      url: '/rest/api/2/jql/sanitize',
      method: 'POST',
      body: {
        queries: parameters.queries,
      },
    };

    return this.client.sendRequest(request);
  }
}
