import { describe, it } from 'vitest';

// ─────────────────────────────────────────────────────────────────────────────
// NOT IMPLEMENTED — these APIs require an OAuth 2.0 Bearer token issued for a
// Jira Software app. They cannot be tested with a basic API token.
//
// See: knowledge/OAuth 2.0 Live Test Workflow.md
// ─────────────────────────────────────────────────────────────────────────────

describe.skip('builds — live (requires OAuth)', () => {
  describe('submitBuilds', () => {
    it.todo('accepts valid builds and returns them in acceptedBuilds');
    it.todo('returns unknownIssueKeys for nonexistent issue associations');
    it.todo('returns failedBuilds for invalid build data');
    it.todo('updates an existing build when updateSequenceNumber is higher');
    it.todo('attaches providerMetadata without affecting acceptance');
  });

  describe('getBuildByKey', () => {
    it.todo('retrieves a previously submitted build by pipelineId and buildNumber');
    it.todo('throws ApiError for a nonexistent pipelineId');
  });

  describe('deleteBuildByKey', () => {
    it.todo('deletes a submitted build without error');
    it.todo('throws ApiError for a nonexistent build');
  });

  describe('deleteBuildsByProperty', () => {
    it.todo('deletes all builds matching the given properties');
  });
});

describe.skip('deployments — live (requires OAuth)', () => {
  describe('submitDeployments', () => {
    it.todo('accepts valid deployments and returns them in acceptedDeployments');
    it.todo('returns unknownIssueKeys for nonexistent issue associations');
    it.todo('returns failedDeployments for invalid deployment data');
    it.todo('updates an existing deployment when updateSequenceNumber is higher');
  });

  describe('getDeploymentByKey', () => {
    it.todo('retrieves a previously submitted deployment by pipelineId, environmentId and deploymentSequenceNumber');
    it.todo('throws ApiError for a nonexistent deployment key');
  });

  describe('getDeploymentGatingStatusByKey', () => {
    it.todo('returns gating status for a submitted deployment');
    it.todo('throws ApiError for a nonexistent deployment');
  });

  describe('deleteDeploymentByKey', () => {
    it.todo('deletes a submitted deployment without error');
    it.todo('throws ApiError for a nonexistent deployment');
  });

  describe('deleteDeploymentsByProperty', () => {
    it.todo('deletes all deployments matching the given properties');
  });
});

describe.skip('remoteLinks — live (requires OAuth)', () => {
  describe('submitRemoteLinks', () => {
    it.todo('accepts valid remote links and returns them in acceptedRemoteLinks');
    it.todo('returns unknownIssueKeys for nonexistent issue associations');
    it.todo('returns failedRemoteLinks for invalid remote link data');
    it.todo('updates an existing remote link when updateSequenceNumber is higher');
  });

  describe('getRemoteLinkById', () => {
    it.todo('retrieves a previously submitted remote link by id');
    it.todo('throws ApiError for a nonexistent remote link id');
  });

  describe('deleteRemoteLinkById', () => {
    it.todo('deletes a submitted remote link without error');
    it.todo('throws ApiError for a nonexistent remote link');
  });

  describe('deleteRemoteLinksByProperty', () => {
    it.todo('deletes all remote links matching the given properties');
  });
});

describe.skip('securityInformation — live (requires OAuth)', () => {
  describe('submitWorkspaces', () => {
    it.todo('links a workspace and returns it in acceptedWorkspaceIds');
    it.todo('returns failedWorkspaceIds for invalid workspace data');
  });

  describe('getLinkedWorkspaces', () => {
    it.todo('returns all linked workspaces');
  });

  describe('getLinkedWorkspaceById', () => {
    it.todo('retrieves a linked workspace by id');
    it.todo('throws ApiError for a nonexistent workspace id');
  });

  describe('deleteLinkedWorkspaces', () => {
    it.todo('deletes all workspaces matching the given properties');
  });

  describe('submitVulnerabilities', () => {
    it.todo('accepts valid vulnerabilities and returns them in acceptedVulnerabilities');
    it.todo('returns unknownIssueKeys for nonexistent issue associations');
    it.todo('returns failedVulnerabilities for invalid vulnerability data');
    it.todo('updates an existing vulnerability when updateSequenceNumber is higher');
  });

  describe('getVulnerabilityById', () => {
    it.todo('retrieves a previously submitted vulnerability by id');
    it.todo('throws ApiError for a nonexistent vulnerability id');
  });

  describe('deleteVulnerabilityById', () => {
    it.todo('deletes a submitted vulnerability without error');
    it.todo('throws ApiError for a nonexistent vulnerability');
  });

  describe('deleteVulnerabilitiesByProperty', () => {
    it.todo('deletes all vulnerabilities matching the given properties');
  });
});

describe.skip('devopsComponents — live (requires OAuth)', () => {
  describe('submitComponents', () => {
    it.todo('accepts valid components and returns them in acceptedComponents');
    it.todo('returns unknownAssociations for nonexistent associations');
    it.todo('returns failedComponents for invalid component data');
    it.todo('updates an existing component when updateSequenceNumber is higher');
  });

  describe('getComponentById', () => {
    it.todo('retrieves a previously submitted component by id');
    it.todo('throws ApiError for a nonexistent component id');
  });

  describe('deleteComponentById', () => {
    it.todo('deletes a submitted component without error');
    it.todo('throws ApiError for a nonexistent component');
  });

  describe('deleteComponentsByProperty', () => {
    it.todo('deletes all components matching the given properties');
  });
});

describe.skip('operations — live (requires OAuth)', () => {
  describe('submitOperationsWorkspaces', () => {
    it.todo('links a workspace and returns it in acceptedWorkspaceIds');
    it.todo('returns failedWorkspaceIds for invalid workspace data');
  });

  describe('getWorkspaces', () => {
    it.todo('returns all linked operations workspaces');
  });

  describe('deleteWorkspaces', () => {
    it.todo('deletes all workspaces matching the given properties');
  });

  describe('submitEntity', () => {
    it.todo('accepts a valid incident entity and returns it in acceptedEntities');
    it.todo('accepts a valid review entity and returns it in acceptedEntities');
    it.todo('returns unknownAssociations for nonexistent issue associations');
    it.todo('returns failedEntities for invalid entity data');
    it.todo('updates an existing entity when updateSequenceNumber is higher');
  });

  describe('getIncidentById', () => {
    it.todo('retrieves a previously submitted incident by id');
    it.todo('throws ApiError for a nonexistent incident id');
  });

  describe('deleteIncidentById', () => {
    it.todo('deletes a submitted incident without error');
    it.todo('throws ApiError for a nonexistent incident');
  });

  describe('getReviewById', () => {
    it.todo('retrieves a previously submitted review by id');
    it.todo('throws ApiError for a nonexistent review id');
  });

  describe('deleteReviewById', () => {
    it.todo('deletes a submitted review without error');
    it.todo('throws ApiError for a nonexistent review');
  });

  describe('deleteEntityByProperty', () => {
    it.todo('deletes all entities matching the given properties');
  });
});

describe.skip('developmentInformation — live (requires OAuth)', () => {
  describe('storeDevelopmentInformation', () => {
    it.todo('stores repository and commit data, returns acceptedDevinfoEntities');
    it.todo('returns unknownIssueKeys for nonexistent issue associations');
    it.todo('updates existing entries when updateSequenceId is higher');
  });

  describe('getRepository', () => {
    it.todo('retrieves a previously stored repository by id');
    it.todo('throws ApiError for a nonexistent repository id');
  });

  describe('existsByProperties', () => {
    it.todo('returns true when dev info exists for given properties');
    it.todo('returns false when no dev info matches the given properties');
  });

  describe('deleteRepository', () => {
    it.todo('deletes a stored repository without error');
    it.todo('throws ApiError for a nonexistent repository');
  });

  describe('deleteByProperties', () => {
    it.todo('deletes all dev info entries matching the given properties');
  });

  describe('deleteEntity', () => {
    it.todo('deletes a specific dev info entity by type and id');
    it.todo('throws ApiError for a nonexistent entity');
  });
});
