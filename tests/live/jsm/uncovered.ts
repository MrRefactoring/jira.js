/**
 * The Service Management endpoints no run against this container can reach, and why.
 *
 * The ledger in `scripts/lib/liveCoverage.ts` fails when an endpoint is neither called by a suite nor listed here,
 * which is the point: a regenerated surface cannot quietly gain an untested operation, and an endpoint that stops
 * being exercised has to be justified in writing rather than simply disappearing from the count.
 *
 * A reason is required for each. "Hard to test" is not one — the container is disposable and the suites are allowed to
 * ruin it, so the only entries that belong here are the ones this instance cannot answer at all.
 *
 * Every entry below is the same one. Assets ships with the image and its REST module does not check for a seat, so a
 * Jira Software timebomb opens `/rest/assets/1.0` completely — all fifty-eight of its endpoints are exercised — while
 * every `/rest/servicedeskapi/` endpoint answers 403 with an HTML page, and `servicedeskapi/info` says the product is
 * not licensed for use. `GET /servicedeskapi/info` is the one that answers regardless, and the suites call it.
 *
 * This list is therefore also the worklist: put a Service Management Data Center timebomb in
 * `docker/jsm-dc/timebomb-license.txt`, and every line here becomes a test to write.
 */
import type { Uncovered } from '../../../scripts/lib/liveCoverage.ts';

const NOT_LICENSED = 'Service Management is not licensed on the rig, and every servicedeskapi endpoint answers 403.';

export const UNCOVERED: Uncovered[] = [
  { endpoint: "DELETE /servicedeskapi/organization/cleanup", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/organization/{organizationId}", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/organization/{organizationId}/user", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/request/{issueIdOrKey}/participant", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/servicedesk/{serviceDeskId}/organization", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}", reason: NOT_LICENSED },
  { endpoint: "DELETE /servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/admin/queues/{projectKey}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/organization", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/organization/cleanup", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/organization/{organizationId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/organization/{organizationId}/user", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/portals", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/portals/project/{projectKey}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/portals/{portalId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/approval", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/approval/{approvalId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/approval/{approvalId}/config", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/comment", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/comment/{commentId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/participant", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/sla", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/sla/{slaMetricId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/status", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/request/{issueIdOrKey}/transition", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/organization", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/queue", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}/issue", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/requesttype", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/field", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/permission", reason: NOT_LICENSED },
  { endpoint: "GET /servicedeskapi/servicedesk/{serviceDeskId}/requesttypegroup", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/customer", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/organization", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/organization/{organizationId}/user", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request/{issueIdOrKey}/approval/{approvalId}", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request/{issueIdOrKey}/attachment", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request/{issueIdOrKey}/comment", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request/{issueIdOrKey}/participant", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/request/{issueIdOrKey}/transition", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/attachTemporaryFile", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/customer", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/organization", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/queue", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/queue/reorder", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/queue/{queueId}", reason: NOT_LICENSED },
  { endpoint: "POST /servicedeskapi/servicedesk/{serviceDeskId}/requesttype", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/admin/queues/cache-count", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/admin/queues/include-count", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/admin/queues/{projectKey}/cache-count", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/admin/queues/{projectKey}/include-count", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/servicedesk/{serviceDeskId}/requesttype", reason: NOT_LICENSED },
  { endpoint: "PUT /servicedeskapi/servicedesk/{serviceDeskId}/requesttype/{requestTypeId}/permission", reason: NOT_LICENSED },
];
