import {
  IssueUpdateDetails,
  TimeTrackingDetails,
  Project,
} from '../models';

export interface CreateIssue extends Omit<IssueUpdateDetails, 'fields'> {
  /** Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. */
  updateHistory?: boolean;

  /** List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`. */
  fields: {
    [key: string]: any;
    summary: string;
    project: Partial<Project>;
    issuetype: {
      id?: string | number;
      name?: string;
    },
    parent?: {
      [key: string]: any;
      key?: string;
    };
    components?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    description?: string;
    reporter?: {
      [key: string]: any;
      id?: string | number;
    };
    fixVersions?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    priority?: {
      [key: string]: any;
      id?: string | number;
    };
    labels?: string[];
    timetracking?: TimeTrackingDetails;
    security?: {
      [key: string]: any;
      id?: string | number;
    };
    environment?: any;
    versions?: Array<{
      [key: string]: any;
      id?: string | number;
    }>;
    duedate?: string;
    assignee?: {
      [key: string]: any;
      id?: string | number;
    }
  }
}
