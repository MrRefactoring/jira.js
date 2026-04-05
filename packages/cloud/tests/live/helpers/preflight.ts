import type { Client } from '@jira.js/base';
import { z } from 'zod';

const MyselfSchema = z.object({
  accountId: z.string(),
  displayName: z.string().optional(),
  active: z.boolean().optional(),
});

const PermissionsResponseSchema = z.object({
  permissions: z.record(
    z.string(),
    z.object({
      id: z.string().optional(),
      havePermission: z.boolean(),
    }),
  ),
});

const REQUIRED_GLOBAL_PERMISSIONS = [
  'CREATE_ISSUES',
  'EDIT_ISSUES',
  'DELETE_ISSUES',
  'ADD_COMMENTS',
  'DELETE_ALL_COMMENTS',
];

export interface PreflightResult {
  healthy: boolean;
  accountId: string;
  displayName: string | undefined;
  missingPermissions: string[];
  warnings: string[];
  elapsedMs: number;
}

/**
 * Verifies that the Jira environment is reachable and the configured account has the
 * minimum permissions required to run the live test suite.
 *
 * Call from globalSetup (or a manual preflight step) before provisioning test resources.
 * A failed preflight means the environment degraded — not that the SDK regressed.
 */
export async function runPreflight(http: Client): Promise<PreflightResult> {
  const startedAt = Date.now();
  const warnings: string[] = [];

  let myself: z.infer<typeof MyselfSchema>;

  try {
    myself = await http.sendRequest({ url: '/rest/api/3/myself', method: 'GET', schema: MyselfSchema });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    throw new Error(
      `[preflight] Cannot reach Jira API at configured baseUrl. Check JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN. Original error: ${msg}`,
    );
  }

  if (myself.active === false) {
    warnings.push(`Account ${myself.accountId} is not active — tests may fail with 401 or 403 errors`);
  }

  let missingPermissions: string[] = [];

  try {
    const permResponse = await http.sendRequest({
      url: `/rest/api/3/mypermissions?permissions=${REQUIRED_GLOBAL_PERMISSIONS.join(',')}`,
      method: 'GET',
      schema: PermissionsResponseSchema,
    });

    missingPermissions = REQUIRED_GLOBAL_PERMISSIONS.filter(
      perm => !permResponse.permissions[perm]?.havePermission,
    );
  } catch {
    warnings.push('Could not check permissions — proceeding without permission validation');
  }

  if (missingPermissions.length > 0) {
    warnings.push(`Missing permissions: ${missingPermissions.join(', ')} — some tests will fail`);
  }

  return {
    healthy: missingPermissions.length === 0,
    accountId: myself.accountId,
    displayName: myself.displayName,
    missingPermissions,
    warnings,
    elapsedMs: Date.now() - startedAt,
  };
}
