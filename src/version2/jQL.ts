import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class JQL {
  constructor(private client: Client) {}

  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder.
   *
   * To filter visible field details by project or collapse non-unique fields by field type then [Get field reference
   * data (POST)](#api-rest-api-2-jql-autocompletedata-post) can be used.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoComplete<T = Models.JQLReferenceData>(callback: Callback<T>): Promise<void>;
  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder.
   *
   * To filter visible field details by project or collapse non-unique fields by field type then [Get field reference
   * data (POST)](#api-rest-api-2-jql-autocompletedata-post) can be used.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: never): Promise<T>;
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder.
   *
   * This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored.
   * System fields are always returned.
   *
   * It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across
   * all fields with the same name and of the same field type. For example, the collapsed field `Component -
   * Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and `Component - cf[10062]` to be searched
   * simultaneously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoCompletePost<T = Models.JQLReferenceData>(
    parameters: Parameters.GetAutoCompletePost | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced
   * searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions
   * reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this
   * information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom
   * query builder.
   *
   * This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored.
   * System fields are always returned.
   *
   * It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across
   * all fields with the same name and of the same field type. For example, the collapsed field `Component -
   * Component[Dropdown]` enables dropdown fields `Component - cf[10061]` and `Component - cf[10062]` to be searched
   * simultaneously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAutoCompletePost<T = Models.JQLReferenceData>(
    parameters?: Parameters.GetAutoCompletePost,
    callback?: never
  ): Promise<T>;
  async getAutoCompletePost<T = Models.JQLReferenceData>(
    parameters?: Parameters.GetAutoCompletePost,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'POST',
      data: {
        includeCollapsedFields: parameters?.includeCollapsedFields,
        projectIds: parameters?.projectIds,
      },
    };

    return this.client.sendRequest(config, callback);
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(
    parameters: Parameters.GetFieldAutoCompleteForQueryString | undefined,
    callback: Callback<T>
  ): Promise<void>;
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(
    parameters?: Parameters.GetFieldAutoCompleteForQueryString,
    callback?: never
  ): Promise<T>;
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(
    parameters?: Parameters.GetFieldAutoCompleteForQueryString,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/autocompletedata/suggestions',
      method: 'GET',
      params: {
        fieldName: parameters?.fieldName,
        fieldValue: parameters?.fieldValue,
        predicateName: parameters?.predicateName,
        predicateValue: parameters?.predicateValue,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Parses and validates JQL queries.
   *
   * Validation is performed in context of the current user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async parseJqlQueries<T = Models.ParsedJqlQueries>(
    parameters: Parameters.ParseJqlQueries | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Parses and validates JQL queries.
   *
   * Validation is performed in context of the current user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async parseJqlQueries<T = Models.ParsedJqlQueries>(
    parameters?: Parameters.ParseJqlQueries,
    callback?: never
  ): Promise<T>;
  async parseJqlQueries<T = Models.ParsedJqlQueries>(
    parameters?: Parameters.ParseJqlQueries,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/parse',
      method: 'POST',
      params: {
        validation: parameters?.validation,
      },
      data: {
        queries: parameters?.queries,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with
   * account IDs.
   *
   * You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For
   * more information about GDPR-related changes, see the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async migrateQueries<T = Models.ConvertedJQLQueries>(
    parameters: Parameters.MigrateQueries | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with
   * account IDs.
   *
   * You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For
   * more information about GDPR-related changes, see the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async migrateQueries<T = Models.ConvertedJQLQueries>(
    parameters?: Parameters.MigrateQueries,
    callback?: never
  ): Promise<T>;
  async migrateQueries<T = Models.ConvertedJQLQueries>(
    parameters?: Parameters.MigrateQueries,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/pdcleaner',
      method: 'POST',
      data: {
        queryStrings: parameters?.queryStrings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to
   * view the entity.
   *
   * For example, if the query contains the clause _project = 'Secret project'_, and a user does not have browse
   * permission for the project "Secret project", the sanitized query replaces the clause with _project = 12345"_ (where
   * 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If the account
   * ID is null, sanitizing is performed for an anonymous user.
   *
   * Note that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers
   * (username or user key). If you need to make queries GDPR-compliant, use [Convert user identifiers to account IDs in
   * JQL
   * queries](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).
   *
   * Before sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async sanitiseJqlQueries<T = Models.SanitizedJqlQueries>(
    parameters: Parameters.SanitiseJqlQueries | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to
   * view the entity.
   *
   * For example, if the query contains the clause _project = 'Secret project'_, and a user does not have browse
   * permission for the project "Secret project", the sanitized query replaces the clause with _project = 12345"_ (where
   * 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If the account
   * ID is null, sanitizing is performed for an anonymous user.
   *
   * Note that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers
   * (username or user key). If you need to make queries GDPR-compliant, use [Convert user identifiers to account IDs in
   * JQL
   * queries](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).
   *
   * Before sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async sanitiseJqlQueries<T = Models.SanitizedJqlQueries>(
    parameters?: Parameters.SanitiseJqlQueries,
    callback?: never
  ): Promise<T>;
  async sanitiseJqlQueries<T = Models.SanitizedJqlQueries>(
    parameters?: Parameters.SanitiseJqlQueries,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/sanitize',
      method: 'POST',
      data: {
        queries: parameters?.queries,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters: Parameters.GetPrecomputations | undefined,
    callback: Callback<T>
  ): Promise<void>;
  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters?: Parameters.GetPrecomputations,
    callback?: never
  ): Promise<T>;
  async getPrecomputations<T = Models.PageJqlFunctionPrecomputation>(
    parameters?: Parameters.GetPrecomputations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/function/computation',
      method: 'GET',
      params: {
        functionKey: parameters?.functionKey,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        orderBy: parameters?.orderBy,
        filter: parameters?.filter,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  async updatePrecomputations<T = unknown>(
    parameters: Parameters.UpdatePrecomputations,
    callback: Callback<T>
  ): Promise<void>;
  async updatePrecomputations<T = unknown>(parameters: Parameters.UpdatePrecomputations, callback?: never): Promise<T>;
  async updatePrecomputations<T = unknown>(
    parameters: Parameters.UpdatePrecomputations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/jql/function/computation',
      method: 'POST',
      data: {
        values: parameters.values,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
