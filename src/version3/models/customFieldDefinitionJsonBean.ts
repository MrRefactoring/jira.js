export interface CustomFieldDefinitionJsonBean {
  /** The name of the custom field, which is displayed in Jira. This is not the unique identifier. */
  name: string;
  /** The description of the custom field, which is displayed in Jira. */
  description?: string;
  /** The type of the custom field. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppicker*.

     *  `cascadingselect`: Allows multiple values to be selected using two select lists
     *  `datepicker`: Stores a date using a picker control
     *  `datetime`: Stores a date with a time component
     *  `float`: Stores and validates a numeric (floating point) input
     *  `grouppicker`: Stores a user group using a picker control
     *  `importid`: A read-only field that stores the previous ID of the issue from the system that it was imported from
     *  `labels`: Stores labels
     *  `multicheckboxes`: Stores multiple values using checkboxes
     *  `multigrouppicker`: Stores multiple user groups using a picker control
     *  `multiselect`: Stores multiple values using a select list
     *  `multiuserpicker`: Stores multiple users using a picker control
     *  `multiversion`: Stores multiple versions from the versions available in a project using a picker control
     *  `project`: Stores a project from a list of projects that the user is permitted to view
     *  `radiobuttons`: Stores a value using radio buttons
     *  `readonlyfield`: Stores a read-only text value, which can only be populated via the API
     *  `select`: Stores a value from a configurable list of options
     *  `textarea`: Stores a long text string using a multiline text area
     *  `textfield`: Stores a text string using a single-line text box
     *  `url`: Stores a URL
     *  `userpicker`: Stores a user using a picker control
     *  `version`: Stores a version using a picker control */
  type: string;
  /** The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*.
    The search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):

     *  `cascadingselect`: `cascadingselectsearcher`
     *  `datepicker`: `daterange`
     *  `datetime`: `datetimerange`
     *  `float`: `exactnumber` or `numberrange`
     *  `grouppicker`: `grouppickersearcher`
     *  `importid`: `exactnumber` or `numberrange`
     *  `labels`: `labelsearcher`
     *  `multicheckboxes`: `multiselectsearcher`
     *  `multigrouppicker`: `multiselectsearcher`
     *  `multiselect`: `multiselectsearcher`
     *  `multiuserpicker`: `userpickergroupsearcher`
     *  `multiversion`: `versionsearcher`
     *  `project`: `projectsearcher`
     *  `radiobuttons`: `multiselectsearcher`
     *  `readonlyfield`: `textsearcher`
     *  `select`: `multiselectsearcher`
     *  `textarea`: `textsearcher`
     *  `textfield`: `textsearcher`
     *  `url`: `exacttextsearcher`
     *  `userpicker`: `userpickergroupsearcher`
     *  `version`: `versionsearcher` */
  searcherKey: string;
}
