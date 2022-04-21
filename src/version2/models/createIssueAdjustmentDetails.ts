import { IssueAdjustmentContextDetails } from './issueAdjustmentContextDetails';

/** The details of an issue adjustment. */
export interface CreateIssueAdjustmentDetails {
  /** The name of the issue adjustment. The maximum length is 255 characters. */
  name: string;
  /** The description of the issue adjustment. The maximum length is 255 characters. */
  description?: string;
  /** The data of the issue adjustment. The maximum size of the data is 50000 characters. */
  data?: string;
  /** List of contexts of the issue adjustment. The maximum number of contexts is 1000. */
  contexts?: IssueAdjustmentContextDetails[];
}
