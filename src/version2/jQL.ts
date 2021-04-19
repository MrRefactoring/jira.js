import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class JQL {
  constructor(private client: Client) { }
  /**
     * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAutoComplete<T = Models.JQLReferenceData>(callback: Callback<T>): Promise<void>;
  /**
     * Returns reference data for JQL searches. This is a downloadable version of the documentation provided in [Advanced searching - fields reference](https://confluence.atlassian.com/x/gwORLQ) and [Advanced searching - functions reference](https://confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: never): Promise<T>;
  async getAutoComplete<T = Models.JQLReferenceData>(callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/jql/autocompletedata',
      method: 'GET',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAutoComplete' });
  }
  /**
     * Returns the JQL search auto complete suggestions for a field.
     *
     * Suggestions can be obtained by providing:
     *
     *  *  `fieldName` to get a list of all values for the field.
     *  *  `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.
     *  *  `fieldName` and `predicateName` to get a list of all predicate values for the field.
     *  *  `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in `predicateValue`.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters: Parameters.GetFieldAutoCompleteForQueryString | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns the JQL search auto complete suggestions for a field.
     *
     * Suggestions can be obtained by providing:
     *
     *  *  `fieldName` to get a list of all values for the field.
     *  *  `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.
     *  *  `fieldName` and `predicateName` to get a list of all predicate values for the field.
     *  *  `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in `predicateValue`.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters?: Parameters.GetFieldAutoCompleteForQueryString, callback?: never): Promise<T>;
  async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters?: Parameters.GetFieldAutoCompleteForQueryString, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/jql/autocompletedata/suggestions',
      method: 'GET',
      params: {
        fieldName: parameters?.fieldName,
        fieldValue: parameters?.fieldValue,
        predicateName: parameters?.predicateName,
        predicateValue: parameters?.predicateValue,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getFieldAutoCompleteForQueryString' });
  }
  /**
     * Parses and validates JQL queries.
     *
     * Validation is performed in context of the current user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters: Parameters.ParseJqlQueries | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Parses and validates JQL queries.
     *
     * Validation is performed in context of the current user.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters?: Parameters.ParseJqlQueries, callback?: never): Promise<T>;
  async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters?: Parameters.ParseJqlQueries, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/jql/parse',
      method: 'POST',
      params: {
        validation: parameters?.validation,
      },
      data: {
        queries: parameters?.queries,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'parseJqlQueries' });
  }
  /**
     * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.
     *
     * You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async migrateQueries<T = Models.ConvertedJQLQueries>(parameters: Parameters.MigrateQueries | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.
     *
     * You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Permission to access Jira. */
  async migrateQueries<T = Models.ConvertedJQLQueries>(parameters?: Parameters.MigrateQueries, callback?: never): Promise<T>;
  async migrateQueries<T = Models.ConvertedJQLQueries>(parameters?: Parameters.MigrateQueries, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/jql/pdcleaner',
      method: 'POST',
      data: {
        queryStrings: parameters?.queryStrings,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'migrateQueries' });
  }
}
