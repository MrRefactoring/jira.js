export interface GetSlaInformationById {
  /** The ID or key of the customer request whose SLAs will be retrieved. */
  issueIdOrKey: string;
  /** The ID or key of the SLAs metric to be retrieved. */
  slaMetricId: number;
}
