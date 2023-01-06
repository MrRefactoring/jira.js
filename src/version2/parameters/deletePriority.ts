export interface DeletePriority {
  /** The ID of the issue priority. */
  id: string;
  /** The ID of the issue priority for replacement. */
  newPriority?: string;
  /** The ID of the issue priority that will replace the currently selected resolution. */
  replaceWith: string;
}
