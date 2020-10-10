export interface HistoryMetadata {
  type: string;
  description: string;
  activityDescription: string;
  activityDescriptionKey: string;
  emailDescription: string;
  emailDescriptionKey: string;
  actor: {
    [key: string]: unknown;
  };
  generator: {
    [key: string]: unknown;
  };
  cause: {
    [key: string]: unknown;
  };
  extraData: {
    [key: string]: unknown;
  };
}
