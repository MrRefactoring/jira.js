export interface GetVersion {
  /** The ID of the version. */
  id: string;
  /** Use [expand](#expansion) to include additional information about version in the response. This parameter accepts a comma-separated list. Expand options include:

   *  `operations` Returns the list of operations available for this version.
   *  `issuesstatus` Returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property represents the number of issues with a status other than *to do*, *in progress*, and *done*. */
  expand?: string;
}
