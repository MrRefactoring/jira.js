/**
 * The Data Center endpoints no run against a single-node instance can reach, and why.
 *
 * The ledger in `scripts/serverCoverage.ts` fails when an endpoint is neither called by a suite nor listed here, which
 * is the point: a regenerated surface cannot quietly gain an untested operation, and an endpoint that stops being
 * exercised has to be justified in writing rather than simply disappearing from the count.
 *
 * A reason is required for each. "Hard to test" is not one — the container is disposable and the suites are allowed
 * to ruin it, so the only entries that belong here are the ones a fresh, unclustered, correctly-versioned Jira cannot
 * answer at all.
 */
export interface Uncovered {
  /** `METHOD /path` exactly as the generated function spells it, placeholders and all. */
  endpoint: string;
  reason: string;
}

export const UNCOVERED: Uncovered[] = [
  {
    endpoint: 'GET /api/2/customFields/{customFieldId}/options',
    reason: 'Needs a custom field of a type that has options, and Data Center has no REST endpoint that adds one.',
  },
  {
    endpoint: 'GET /api/2/customFieldOption/{id}',
    reason: 'An option id belongs to a custom field of a type that has options, which no REST endpoint creates.',
  },
  {
    endpoint: 'GET /api/2/dashboard/{dashboardId}/items/{itemId}/properties',
    reason: 'A dashboard item is a gadget, and Data Center exposes no REST endpoint that puts a gadget on a dashboard.',
  },
  {
    endpoint: 'GET /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the property-keys endpoint beside it: no gadget can be created, so no item id exists.',
  },
  {
    endpoint: 'PUT /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the reads: there is no item to hang a property on.',
  },
  {
    endpoint: 'DELETE /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the reads: there is no item to hang a property on.',
  },
  {
    endpoint: 'GET /api/2/securitylevel/{id}',
    reason: 'Needs an issue security scheme with levels, which Data Center only lets an administrator create in the UI.',
  },
];
