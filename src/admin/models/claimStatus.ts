import type { z } from 'zod';
import { openEnum } from '#/core';
/**
 * The claim status for the user account.*
 *
 * - `managed` - Returns only managed accounts. For more on managed accounts:
 *   https://support.atlassian.com/user-management/docs/what-are-managed-accounts/.*
 * - `unmanaged` - Returns only unmanaged accounts.
 */

export const ClaimStatusSchema = openEnum(['managed', 'unmanaged']);

export type ClaimStatus = z.infer<typeof ClaimStatusSchema>;
