import type { Document, IssueUpdateDetails, Project, TimeTrackingDetails } from '../models';

export interface CreateIssue extends Omit<IssueUpdateDetails, 'fields'> {
  /**
   * Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown
   * under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a
   * project. These values are then used to provide defaults on the issue create screen.
   */
  updateHistory?: boolean;

  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Record<string, any> & {
    summary: string;
    project: Partial<Project>;
    issuetype: {
      id?: string | number;
      name?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parent?: Record<string, any> & {
      key?: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    components?: Array<Record<string, any> & {
      id?: string | number;
    }>;
    description?: string | Document;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reporter?: Record<string, any> & {
      id?: string | number;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fixVersions?: Array<Record<string, any> & {
      id?: string | number;
    }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    priority?: Record<string, any> & {
      id?: string | number;
    };
    labels?: string[];
    timetracking?: TimeTrackingDetails;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    security?: Record<string, any> & {
      id?: string | number;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    environment?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    versions?: Array<Record<string, any> & {
      id?: string | number;
    }>;
    duedate?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    assignee?: Record<string, any> & {
      id?: string | number;
    };
  };
}
