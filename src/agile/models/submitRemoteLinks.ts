/**
 * The result of a successful `submitRemoteLinks` request.
 *  */
export interface SubmitRemoteLinks {
  /** The IDs of Remote Links that have been accepted for submission.

   A Remote Link may be rejected if it was only associated with unknown issue keys, unknown service IDs, or if
   the submitted data for that Remote Link does not match the required schema.

   Note that a Remote Link that isn't updated due to it's `updateSequenceNumber` being out of order is not
   considered a failed submission.
   */
  acceptedRemoteLinks?: string[];
  /** Details of Remote Links that have not been accepted for submission, usually due to a problem with the request data.

   A Remote Link may be rejected if it was only associated with unknown issue keys, unknown service IDs, or
   if the submitted data for the Remote Link does not match the required schema.

   The object (if present) will be keyed by Remote Link ID and include any errors associated with that
   Remote Link that have prevented it being submitted.
   */
  rejectedRemoteLinks?: {};
  /** Issue keys or services IDs or keys that are not known on this Jira instance (if any).
   */
  unknownAssociations?: string[];
}
