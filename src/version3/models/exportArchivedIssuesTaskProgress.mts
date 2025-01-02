/** The response for status request for a running/completed export task. */
export interface ExportArchivedIssuesTaskProgress {
  fileUrl?: string;
  payload?: string;
  progress?: number;
  status?: string;
  submittedTime?: string;
  taskId?: string;
}
