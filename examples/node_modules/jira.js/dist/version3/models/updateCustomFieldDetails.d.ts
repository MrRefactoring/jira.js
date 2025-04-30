/** Details of a custom field. */
export interface UpdateCustomFieldDetails {
    /** The name of the custom field. It doesn't have to be unique. The maximum length is 255 characters. */
    name?: string;
    /** The description of the custom field. The maximum length is 40000 characters. */
    description?: string;
    /**
     * The searcher that defines the way the field is searched in Jira. It can be set to `null`, otherwise you must
     * specify the valid searcher for the field type, as listed below (abbreviated values shown):
     *
     * `cascadingselect`: `cascadingselectsearcher` `datepicker`: `daterange` `datetime`: `datetimerange` `float`:
     * `exactnumber` or `numberrange` `grouppicker`: `grouppickersearcher` `importid`: `exactnumber` or `numberrange`
     * `labels`: `labelsearcher` `multicheckboxes`: `multiselectsearcher` `multigrouppicker`: `multiselectsearcher`
     * `multiselect`: `multiselectsearcher` `multiuserpicker`: `userpickergroupsearcher` `multiversion`: `versionsearcher`
     * `project`: `projectsearcher` `radiobuttons`: `multiselectsearcher` `readonlyfield`: `textsearcher` `select`:
     * `multiselectsearcher` `textarea`: `textsearcher` `textfield`: `textsearcher` `url`: `exacttextsearcher`
     * `userpicker`: `userpickergroupsearcher` `version`: `versionsearcher`
     */
    searcherKey?: string;
}
