import { describe, it } from 'vitest';

// ─────────────────────────────────────────────────────────────────────────────
// NOT IMPLEMENTED — tests that cannot run with a basic API token.
//
// Grouped by blocking reason so it's easy to find which tests to enable
// when the corresponding capability becomes available.
// ─────────────────────────────────────────────────────────────────────────────

// ── Requires paid Jira plan ───────────────────────────────────────────────────

describe.skip('auditRecords — live (requires paid plan)', () => {
  describe('getAuditRecords', () => {
    it.todo('returns AuditRecords with records array');
    it.todo('supports limit and offset pagination');
    it.todo('supports text filter');
  });
});

// ── Requires Connect app credentials ─────────────────────────────────────────

describe.skip('appMigration — live (requires Connect app)', () => {
  describe('updateIssueFields', () => {
    it.todo('updates custom field values on issues via Connect app');
    it.todo('returns void on success');
  });

  describe('updateEntityPropertiesValue', () => {
    it.todo('updates entity property values for Connect app');
    it.todo('returns void on success');
  });

  describe('workflowRuleSearch', () => {
    it.todo('returns workflow rules matching the search criteria');
    it.todo('filters by ruleType');
  });
});

describe.skip('appProperties — live (requires Connect/Forge app)', () => {
  describe('getAddonProperties', () => {
    it.todo('returns all properties of the calling app');
  });

  describe('getAddonProperty', () => {
    it.todo('returns a specific property by key');
    it.todo('throws 404 for a non-existent property key');
  });

  describe('putAddonProperty', () => {
    it.todo('creates or updates a property and returns OperationMessage');
    it.todo('round-trips a value via getAddonProperty');
  });

  describe('deleteAddonProperty', () => {
    it.todo('deletes an existing property and returns void');
    it.todo('throws 404 for a non-existent property key');
  });
});

describe.skip('appDataPolicies — live (requires Connect/OAuth app)', () => {
  describe('getPolicy', () => {
    it.todo('returns WorkspaceDataPolicy');
  });

  describe('getPolicies', () => {
    it.todo('returns ProjectDataPolicies');
  });
});

describe.skip('dynamicModules — live (requires Connect/Forge app)', () => {
  describe('getModules', () => {
    it.todo('returns all dynamically registered modules for the app');
  });

  describe('registerModules', () => {
    it.todo('registers new dynamic modules and returns void');
    it.todo('throws on invalid module descriptor');
  });

  describe('removeModules', () => {
    it.todo('removes previously registered dynamic modules');
    it.todo('returns void on success');
  });
});

describe.skip('migrationOfConnectModulesToForge — live (requires Connect app + migration context)', () => {
  it.todo('returns details of a Connect issue field migration to Forge');
  it.todo('returns 404 for an unknown Connect field key');
  it.todo('reflects migration status after the Forge replacement is published');
});

describe.skip('webhooks — live (requires Connect/OAuth app)', () => {
  describe('getDynamicWebhooksForApp', () => {
    it.todo('returns PageWebhook');
  });

  describe('registerDynamicWebhooks', () => {
    it.todo('registers webhooks and returns void');
  });

  describe('deleteWebhookById', () => {
    it.todo('deletes webhook and returns void');
  });

  describe('refreshWebhooks', () => {
    it.todo('refreshes webhook expiry and returns void');
  });
});

describe.skip('issueCustomFieldOptionsApps — live (requires Connect app)', () => {
  describe('getAllIssueFieldOptions', () => {
    it.todo('returns all options for a Connect app custom field');
    it.todo('supports pagination');
  });

  describe('createIssueFieldOption', () => {
    it.todo('creates a new option for the custom field');
    it.todo('returns the created IssueFieldOption');
  });

  describe('getSelectableIssueFieldOptions', () => {
    it.todo('returns options visible to the current user');
  });

  describe('getVisibleIssueFieldOptions', () => {
    it.todo('returns options visible in the project/issue context');
  });

  describe('getIssueFieldOption', () => {
    it.todo('returns a specific option by optionId');
    it.todo('throws 404 for a non-existent optionId');
  });

  describe('updateIssueFieldOption', () => {
    it.todo('updates an existing option value');
    it.todo('returns the updated IssueFieldOption');
  });

  describe('deleteIssueFieldOption', () => {
    it.todo('deletes an option and returns void');
    it.todo('throws if the option is in use and replaceWith is not provided');
  });

  describe('replaceIssueFieldOption', () => {
    it.todo('replaces one option with another across all issues');
    it.todo('returns a task ID for the async operation');
  });
});

describe.skip('workflowTransitionRules — live (requires Connect/Forge app)', () => {
  describe('getWorkflowTransitionRuleConfigurations', () => {
    it.todo('returns PageWorkflowTransitionRules');
  });

  describe('updateWorkflowTransitionRuleConfigurations', () => {
    it.todo('updates transition rule configurations');
  });

  describe('deleteWorkflowTransitionRuleConfigurations', () => {
    it.todo('deletes transition rule configurations');
  });
});

// ── Requires Forge app credentials ───────────────────────────────────────────

describe.skip('uiModificationsApps — live (requires Forge app)', () => {
  describe('getUiModifications', () => {
    it.todo('returns all UI modifications registered by the Forge app');
    it.todo('supports pagination via startAt and maxResults');
    it.todo('expand=data includes full modification data');
  });

  describe('createUiModification', () => {
    it.todo('creates a new UI modification and returns its id and self link');
    it.todo('throws on invalid viewType');
  });

  describe('updateUiModification', () => {
    it.todo('updates contexts or data of an existing UI modification');
    it.todo('returns void on success');
  });

  describe('deleteUiModification', () => {
    it.todo('deletes a UI modification and returns void');
    it.todo('throws 404 for an unknown uiModificationId');
  });
});

describe.skip('issueCustomFieldConfigurationApps — live (requires Forge app)', () => {
  describe('getCustomFieldConfiguration', () => {
    it.todo('returns configuration for a custom field provided by the Forge app');
    it.todo('supports pagination via startAt and maxResults');
    it.todo('filters by fieldContextId');
  });

  describe('updateCustomFieldConfiguration', () => {
    it.todo('updates the configuration of a custom field');
    it.todo('returns void on success');
  });
});

describe.skip('issueCustomFieldValuesApps — live (requires Forge/Connect app)', () => {
  describe('updateMultipleCustomFieldValues', () => {
    it.todo('updates values of a custom field across multiple issues');
    it.todo('returns void on success');
    it.todo('generateChangelog=false suppresses audit log entries');
  });

  describe('updateCustomFieldValue', () => {
    it.todo('updates the value of a custom field on a single context');
    it.todo('returns void on success');
  });
});

describe.skip('jqlFunctionsApps — live (requires Forge/Connect app)', () => {
  describe('getPrecomputations', () => {
    it.todo('returns a page of precomputations for the app');
    it.todo('supports pagination via startAt and maxResults');
    it.todo('filters by functionKey');
  });

  describe('updatePrecomputations', () => {
    it.todo('updates a precomputation value and returns void');
    it.todo('skipNotFoundPrecomputations=true does not throw on missing IDs');
  });

  describe('getPrecomputationsByID', () => {
    it.todo('returns precomputations matching given IDs');
    it.todo('returns empty list for unknown IDs');
  });
});

describe.skip('issuePanels — live (requires Forge app)', () => {
  describe('bulkPinUnpinProjectsAsync', () => {
    it.todo('pins a Forge panel to multiple projects and returns async response');
    it.todo('unpins a Forge panel from multiple projects');
    it.todo('returns a task ID for polling');
  });

  describe('fetchMigrationTask', () => {
    it.todo('returns the status of a bulk pin/unpin migration task');
    it.todo('throws 404 for an unknown taskId');
  });

  describe('submitTask', () => {
    it.todo('submits a panel migration task and returns task details');
  });
});

describe.skip('projectTemplates — live (requires Forge app with project template)', () => {
  describe('createProjectWithCustomTemplate', () => {
    it.todo('creates project from custom template');
  });
});

// ── Requires specific Jira configuration ──────────────────────────────────────

describe.skip('issueRedaction — live (requires specific Jira configuration)', () => {
  describe('redact', () => {
    it.todo('returns redaction job id');
  });

  describe('getRedactionStatus', () => {
    it.todo('returns RedactionJobStatusResponse for a running redaction job');
  });
});

describe.skip('issueSecurityLevel — live (requires classic project with issue security scheme)', () => {
  describe('getIssueSecurityLevelMembers', () => {
    it.todo('returns PageIssueSecurityLevelMember');
  });

  describe('getIssueSecurityLevel', () => {
    it.todo('returns SecurityLevel');
  });
});

describe.skip('workflowSchemeDrafts — live (requires editable non-active workflow scheme)', () => {
  describe('createWorkflowSchemeDraftFromParent', () => {
    it.todo('creates draft from active workflow scheme');
  });

  describe('getWorkflowSchemeDraft', () => {
    it.todo('returns WorkflowScheme draft');
  });
});

describe.skip('tasks — live (requires an existing async task id)', () => {
  describe('getTask', () => {
    it.todo('returns TaskProgressObject for a valid async task id');
  });
});
