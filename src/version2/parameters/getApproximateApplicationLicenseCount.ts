export interface GetApproximateApplicationLicenseCount {
  /** The ID of the application, represents a specific version of Jira. */
  applicationKey: 'jira-core' | 'jira-product-discovery' | 'jira-software' | 'jira-servicedesk' | string;
}
