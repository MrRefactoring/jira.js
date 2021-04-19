export interface GetIssue {
  /** The ID or key of the issue. */
  issueIdOrKey: string;
  /** A list of fields to return for the issue. This parameter accepts a comma-separated list. Use it to retrieve a subset of fields. Allowed values:

   *  `*all` Returns all fields.
   *  `*navigable` Returns navigable fields.
   *  Any issue field, prefixed with a minus to exclude.

   Examples:

   *  `summary,comment` Returns only the summary and comments fields.
   *  `-description` Returns all (default) fields except description.
   *  `*navigable,-comment` Returns all navigable fields except comment.

   This parameter may be specified multiple times. For example, `fields=field1,field2& fields=field3`.

   Note: All fields are returned by default. This differs from [Search for issues using JQL (GET)](#api-rest-api-2-search-get) and [Search for issues using JQL (POST)](#api-rest-api-2-search-post) where the default is all navigable fields. */
  fields?: string[];
  /** Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID. */
  fieldsByKeys?: boolean;
  /** Use [expand](#expansion) to include additional information about the issues in the response. This parameter accepts a comma-separated list. Expand options include:

   *  `renderedFields` Returns field values rendered in HTML format.
   *  `names` Returns the display name of each field.
   *  `schema` Returns the schema describing a field type.
   *  `transitions` Returns all possible transitions for the issue.
   *  `editmeta` Returns information about how each field can be edited.
   *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.
   *  `versionedRepresentations` Returns a JSON array for each version of a field's value, with the highest number representing the most recent version. Note: When included in the request, the `fields` parameter is ignored. */
  expand?: string;
  /** A list of issue properties to return for the issue. This parameter accepts a comma-separated list. Allowed values:

   *  `*all` Returns all issue properties.
   *  Any issue property key, prefixed with a minus to exclude.

   Examples:

   *  `*all` Returns all properties.
   *  `*all,-prop1` Returns all properties except `prop1`.
   *  `prop1,prop2` Returns `prop1` and `prop2` properties.

   This parameter may be specified multiple times. For example, `properties=prop1,prop2& properties=prop3`. */
  properties?: string[];
  /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. This also populates the [JQL issues search](#api-rest-api-2-search-get) `lastViewed` field. */
  updateHistory?: boolean;
}
