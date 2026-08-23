import { z } from 'zod';
import { apiObject } from '#/core';

export const ManageabilityRestrictionReasonSchema = apiObject({
  /**
   * The property or action is restricted because:
   *
   * - _administrative_: The property or action is restricted because it is intended exclusively for administrative use
   * - _administrative.notMyself_: The property or action is restricted because it is intended for administrative use and
   *   is forbidden for self-use.
   * - _authPolicy.saml_: The property is restricted as it is set on login by SAML
   * - _blocked.exportControl_: The property/action is restricted because the user is blocked by US export control
   * - _externalDirectory.scim_: The property/action is restricted because the user is managed by an external SCIM
   *   directory
   * - _externalDirectory.google_: The property/action is restricted because the user is managed by an external Google
   *   directory
   * - _myselfOnly_: The property or action is restricted because it is available only to the user which the account
   *   belongs to
   * - _managedAccount_: The property or action is restricted because it is available only to the user's organisation
   *   administrator
   */
  key: z.unknown(),
});

export type ManageabilityRestrictionReason = z.infer<typeof ManageabilityRestrictionReasonSchema>;
