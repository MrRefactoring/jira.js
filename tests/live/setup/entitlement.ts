import { ApiError } from '#/core';

/**
 * True when the site refused because of the plan it is on, not because of the request.
 *
 * Project role actor writes and audit logs are paid-plan features. A site on a Free plan answers each of them with a
 * refusal that names the plan rather than anything the caller did — a 400 saying role actors cannot be updated "as
 * it's on the Jira Software Free plan", a 403 saying audit logs "aren't available for this site as all of its Jira
 * Cloud products are on Free plans".
 *
 * None of that is drift and none of it is breakage: the endpoints are correct and the library reaches them. Treated as
 * a failure, a lapsed trial turns the nightly run red for days and buries the signal it exists to carry — here it took
 * the live suite and the schema audit down together for a week. The suites that need those features check this and
 * stand down instead, visibly, so a skipped test reads as skipped rather than as passed.
 *
 * Every other failure stays a failure, so the same tests are real again the moment the site is on a paid plan.
 */
export function isNotEntitled(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;

  return /Free plans?\b|not entitled to/i.test(JSON.stringify(error.body ?? ''));
}
