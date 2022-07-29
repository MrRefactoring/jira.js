# Jira.js changelog

### 2.15.6

Version 2, 3: `getAttachmentThumbnail` currently returns correct data (`Buffer`). Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.


### 2.15.5

Version 3: maxContentLength was increased for attachments upload. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.

### 2.15.4

- Version 2, 3:
  - #221 added `responseType: 'arraybuffer'` for `getAttachmentContent` method, `IssueAttachments` API. Thanks [RealBuddy](https://github.com/RealBuddy) for the report.

### 2.15.3

- Version 2, 3:
  - #219 `accountId` serialization fixed in `bulkGetUsers` in `Users` API fixed. Thanks [Brian Chan](https://github.com/ak4702) for the report.

### 2.15.2

- `isAxiosError` detecting mechanism improved. Thanks [Stephane Moser](https://github.com/Moser-ss) for the report.

### 2.15.1

- ServiceDesk for experimental API `'X-ExperimentalApi': 'opt-in'` header added.

### 2.15.0

- Version 3: addWorklog and updateWorklog comment field type fixed. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.
- Version 2: maxContentLength was increased for attachments upload. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.
- Version 2, Version 3:
  - `uiModificationsApps` API added.
  - `query` property added to `getProjectsForIssueTypeScreenScheme` method `IssueTypeScreenSchemes` API.
  - `commentId` property added to `getMyPermissions` method `Permissions` API.
  - `createPriority`, `searchPriorities`, `updatePriority`  methods added to `IssuePriorities` API.

### 2.14.0

- README: Fast jump to basic authentication topic fixed.
- Version 2 and Version 3:
  - `fixVersion` type definition fixed (`Issue.Fields` model). Thanks to [Eloy Lafuente](https://github.com/stronk7) for reporting the issue.
  - `AnnouncementBanner` API added.
  - `Status` API added.
  - `groupId` property added to `getDashboardsPaginated` method in `Dashboard` API.
  - `groupId` property added to `addActorUsers`, `deleteActor`, `addProjectRoleActorsToRole`, `deleteProjectRoleActorsFromRole` methods in `ProjectRoleActors` API.

### 2.13.0

- Service Desk:
  - `getAttachmentContent` method added to `Request` Service Desk API.
  - `getAttachmentThumbnail` method added to `Request` Service Desk API.
- Version 2, Version 3:
  - `IssueAdjustmentsApps` API added.
  - `groupId` property added to `getFiltersPaginated` method in `Filters` API.
  - `groupId` property added to `addSharePermission` method in `FilterSharing` API.

### 2.12.0

- New error handling feature added.
- Readme improved.
- JSDoc improvements.
- Agile:
  - `createdDate` property added to `Agile.Sprint.partiallyUpdateSprint`, `Agile.Sprint.updateSprint`
- Version 2, Version 3:
  - `groupDetails` and `defaultGroupsDetails` properties added to `ApplicationRole` model.
  - `getAllAvailableDashboardGadgets` method added to `Dashboards`.
  - `status` property added to `getDashboardsPaginated` method in `Dashboards`.
  - `getAllGadgets` method added to `Dashboards`.
  - `addGadget` method added to `Dashboards`.
  - `updateGadget` method added to `Dashboard`.
  - `removeGadget` method added to `Dashboard`.
  - `recipient` property added to `EventNotification` model.
  - `configuration` property added to `FieldMetadata` model.
  - `overrideSharePermissions` property added to `createFilter` method in `Filters`.
  - `groupId` property added to `Group` model.
  - `groupId` property added to `GroupName` model.
  - `groupId` property added to `getGroup` method in `Groups`.
  - `groupId` and `swapGroupId` properties added to `removeGroup` method in `Groups`.
  - `groupId` property added to `getUsersFromGroup` method in `Groups`.
  - `groupId` property added to `addUserToGroup` method in `Groups`.
  - `groupId` property added to `removeUserFromGroup` method in `Groups`.
  - `excludeId` property added to `findGroups` method in `Groups`.
  - `orderBy`, `expand` and `queryString` properties added to `getAllIssueTypeSchemes` method in `IssueTypeSchemes`.
  - `queryString`, `orderBy` and `expand` properties added to `getIssueTypeScreenSchemes` method in `IssueTypeScreenSchemes`.
  - `sanitiseJqlQueries` method added to `JQL`.
  - `excludeInactiveUsers` property added to `getProjectRole` method in `ProjectRoles`.
  - `queryString`, `scope` and `orderBy` properties added to `getScreens` method in `Screens`.
  - `expand`, `queryString` and `orderBy` properties added to `getScreenSchemes` method in `ScreenSchemes`.
  - `identifier` property added to `Visibility` model.
  - another small improvements.

### 2.11.0

- Personal access token authentication added. Thanks, [Nizam Moidu](https://github.com/netmaxt3r) for adding this feature!
- Version 2:
  - `notifyUsers` property added to `IssueComments.updateComment` method.
  - `setFieldConfigurationSchemeMapping` method added to `IssueFieldConfigurations`.
  - `removeIssueTypesFromGlobalFieldConfigurationScheme` method added to `IssueFieldConfigurations`.
  - `getIsWatchingIssueBulk` method added to `IssueWatchers`.
  - `queryString`, `orderBy`, `isActive` properties added to `Workflows.getWorkflowsPaginated` method.
  - `AppMigration.updateEntityPropertiesValue` method parameters for sending fixed.
  - `Workflows.getWorkflowsPaginated` parameters serializing fixed.
- Tests improving.
- JSDoc improved.
- Expand properties typings improved for few Parameters.

### 2.10.4

- `accountId` property added to `IssueWatchers`. Thanks, [Brent Van Geertruy](https://github.com/knor-el-snor) for catching and fixing this issue!

### 2.10.3

- Fixing parameters serialization for users.bulkGetUsersMigration. Thanks [Maximilian Heinz](https://github.com/meandmax) for report.

### 2.10.2

- issueComments.updateComment fixed. Thanks [Rafael Dohms](https://github.com/rdohms)!

### 2.10.1

- Models export extended for Version 2 and Version 3 API

### 2.10.0

- [Service Desk API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/) added

### 2.9.0

- Telemetry removed (deprecated).
- JSDoc improvements.
- Version 2 and Version 3:
  - `jsdAuthorCanSeeRequest` property added to `IssueComments.addComment` method.
  - `id` and `fieldContextId` properties added to `IssueCustomFieldConfigurationApps.getCustomFieldConfiguration` method.
  - `updateFieldConfigurationItems`, `createFieldConfigurationScheme`, `updateFieldConfigurationScheme`, `deleteFieldConfigurationScheme` methods added to `IssueFieldConfigurations`.
  - `bulkSetIssuePropertiesByIssue` method added to `IssueProperties`.
  - `startedBefore` property added to `IssueProperties.getIssueWorklog` method.
  - `renderer` property added to `FieldConfigurationItem` model.
  - `editPermissions` and `expand` properties added to `FilterDetails` model.
  - `tabs` property added to `IssueTransition` model.
  - `emailAddressStatus` property added to `ProjectEmail.updateProjectEmail` method.

### 2.8.0

- JSDoc improvements.
- Version 2 and Version 3
  - `mediaApiFileId` property added to `AttachmentMetadata` model.
  - [`getAvatarImageByType`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-get) method added to `Avatar` group.
  - [`getAvatarImageByID`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-avatar-id-get) method added to `Avatar` group.
  - [`getAvatarImageByOwner`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-owner-entityid-get) method added to `Avatar` group.
  - `editPermissions` property added to `Filter` model.
  - [`getAttachmentContent`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-attachments/#api-rest-api-2-attachment-content-id-get) method added to `IssueAttachments` group.
  - [`getAttachmentThumbnail`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-attachments/#api-rest-api-2-attachment-thumbnail-id-get) method added to `IssueAttachments` group.
  - `overrideScreenSecurity` and `overrideEditableFlag` properties added to `replaceIssueFieldOption` method in `IssueCustomFieldOptionsApps` group.
  - [`updateMultipleCustomFieldValues`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-values--apps-/#api-rest-api-2-app-field-value-post) method added to `IssueCustomFieldValuesApps` group.
  - [`createFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-post) method added to `IssueFieldConfigurations` group.
  - [`updateFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-id-put) method added to `IssueFieldConfigurations` group.
  - [`deleteFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-id-delete) method added to `IssueFieldConfigurations` group.
  - `custom` property added to `JiraExpressionEvalContext` model.
  - `schemes` property added to `Workflow` model.

### 2.7.0

- Version 2:
  - JSDoc improvements.
  - [`deleteCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-delete) method added to `IssueFields`.
  - [`restoreCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-restore-post) method added to `IssueFields`.
  - [`trashCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-trash-post) method added to `IssueFields`.
- Version 3:
  - [`deleteCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-delete) method added to `IssueFields`.
  - [`restoreCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-restore-post) method added to `IssueFields`.
  - [`trashCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-trash-post) method added to `IssueFields`.

### 2.6.3

- Missed telemetry data added.

### 2.6.2

- Version 2 and Version 3:
  - [`getEvents`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-events-get) method added to `Issues`.
  - [`getRecent`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-rest-api-2-project-recent-get) method added to `Projects`.

### 2.6.1

- Common improvements:
  - Fixing vulnerabilities in dependencies.
- Version 2, Version 3:
  - Caught a mistake in issue attachment API [#152](https://github.com/MrRefactoring/jira.js/pull/152). Thanks [prasanna](https://github.com/balaprasanna)!

### 2.6.0

- Agile:
  - JSDOC small improvements
- Version 2 and Version 3:
  - JSDOC small improvements
  - `workflowRuleSearch` method added to `AppMigration`
  - `rules` property added to `CreateWorkflowTransitionDetails` model
  - `isWritable` property added to `Dashboard` model
  - `editPermissions` property added to `DashboardDetails` model
  - `accountId` property added to `filterSharing.addSharePermission`
  - `rights` property added to `filterSharing.addSharePermission`
  - `SearchAutoComplete` model are deprecated
  - `projectKeyOrId` property added to `issueCustomFieldConfigurationApps.getCustomFieldConfiguration`
  - `issueTypeId` property added to `issueCustomFieldConfigurationApps.getCustomFieldConfiguration`
  - `getProjectsForIssueTypeScreenScheme` method added to `IssueTypeScreenSchemes`
  - `workflowNames` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `withTags` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `draft` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `ActorInputBean` renamed to `ActorInput`,
  - `AddFieldBean` renamed to `AddField`,
  - `AddGroupBean` renamed to `AddGroup`,
  - `AssociatedItemBean` renamed to `AssociatedItem`,
  - `AuditRecordBean` renamed to `AuditRecord`,
  - `AvatarUrlsBean` renamed to `AvatarUrls`,
  - `BulkPermissionsRequestBean` renamed to `BulkPermissionsRequest`,
  - `ChangedValueBean` renamed to `ChangedValue`,
  - `CreateUpdateRoleRequestBean` renamed to `CreateUpdateRoleRequest`,
  - `CustomFieldDefinitionJsonBean` renamed to `CustomFieldDefinitionJson`,
  - `DeleteAndReplaceVersionBean` renamed to `DeleteAndReplaceVersion`,
  - `GlobalScopeBean` renamed to `GlobalScope`,
  - `IdBean` renamed to `Id`,
  - `IdOrKeyBean` renamed to `IdOrKey`,
  - `IssueBean` renamed to `Issue`,
  - `IssueCommentListRequestBean` renamed to `IssueCommentListRequest`,
  - `IssueFieldOptionCreateBean` renamed to `IssueFieldOptionCreate`,
  - `IssueFieldOptionScopeBean` renamed to `IssueFieldOptionScope`,
  - `ProjectScopeBean` renamed to `ProjectScope`,
  - `IssuesJqlMetaDataBean` renamed to `IssuesJqlMetaData`,
  - `IssuesMetaBean` renamed to `IssuesMeta`,
  - `IssuesUpdateBean` renamed to `IssuesUpdate`,
  - `IssueTypeCreateBean` renamed to `IssueTypeCreate`,
  - `IssueTypeUpdateBean` renamed to `IssueTypeUpdate`,
  - `JiraExpressionEvalContextBean` renamed to `JiraExpressionEvalContext`,
  - `JiraExpressionEvalRequestBean` renamed to `JiraExpressionEvalRequest`,
  - `JiraExpressionEvaluationMetaDataBean` renamed to `JiraExpressionEvaluationMetaData`,
  - `JiraExpressionsComplexityBean` renamed to `JiraExpressionsComplexity`,
  - `JiraExpressionsComplexityValueBean` renamed to `JiraExpressionsComplexityValue`,
  - `JsonTypeBean` renamed to `JsonType`,
  - `LinkIssueRequestJsonBean` renamed to `LinkIssueRequestJson`,
  - `MoveFieldBean` renamed to `MoveField`,
  - `PageBeanChangelog` renamed to `PageChangelog`,
  - `PageBeanComment` renamed to `PageComment`,
  - `PageBeanComponentWithIssueCount` renamed to `PageComponentWithIssueCount`,
  - `PageBeanContext` renamed to `PageContext`,
  - `PageBeanContextForProjectAndIssueType` renamed to `PageContextForProjectAndIssueType`,
  - `PageBeanCustomFieldContext` renamed to `PageCustomFieldContext`,
  - `PageBeanCustomFieldContextDefaultValue` renamed to `PageCustomFieldContextDefaultValue`,
  - `PageBeanCustomFieldContextOption` renamed to `PageCustomFieldContextOption`,
  - `PageBeanCustomFieldContextProjectMapping` renamed to `PageCustomFieldContextProjectMapping`,
  - `PageBeanCustomFieldOptionDetails` renamed to `PageCustomFieldOptionDetails`,
  - `PageBeanDashboard` renamed to `PageDashboard`,
  - `PageBeanField` renamed to `PageField`,
  - `PageBeanFieldConfiguration` renamed to `PageFieldConfiguration`,
  - `PageBeanFieldConfigurationIssueTypeItem` renamed to `PageFieldConfigurationIssueTypeItem`,
  - `PageBeanFieldConfigurationItem` renamed to `PageFieldConfigurationItem`,
  - `PageBeanFieldConfigurationScheme` renamed to `PageFieldConfigurationScheme`,
  - `PageBeanFieldConfigurationSchemeProjects` renamed to `PageFieldConfigurationSchemeProjects`,
  - `PageBeanFilterDetails` renamed to `PageFilterDetails`,
  - `PageBeanGroupDetails` renamed to `PageGroupDetails`,
  - `PageBeanIssueFieldOption` renamed to `PageIssueFieldOption`,
  - `PageBeanIssueSecurityLevelMember` renamed to `PageIssueSecurityLevelMember`,
  - `PageBeanIssueTypeScheme` renamed to `PageIssueTypeScheme`,
  - `PageBeanIssueTypeSchemeMapping` renamed to `PageIssueTypeSchemeMapping`,
  - `PageBeanIssueTypeSchemeProjects` renamed to `PageIssueTypeSchemeProjects`,
  - `PageBeanIssueTypeScreenScheme` renamed to `PageIssueTypeScreenScheme`,
  - `PageBeanIssueTypeScreenSchemeItem` renamed to `PageIssueTypeScreenSchemeItem`,
  - `PageBeanIssueTypeScreenSchemesProjects` renamed to `PageIssueTypeScreenSchemesProjects`,
  - `PageBeanIssueTypeToContextMapping` renamed to `PageIssueTypeToContextMapping`,
  - `PageBeanNotificationScheme` renamed to `PageNotificationScheme`,
  - `PageBeanProject` renamed to `PageProject`,
  - `PageBeanScreen` renamed to `PageScreen`,
  - `PageBeanScreenScheme` renamed to `PageScreenScheme`,
  - `PageBeanScreenWithTab` renamed to `PageScreenWithTab`,
  - `PageBeanString` renamed to `PageString`,
  - `PageBeanUser` renamed to `PageUser`,
  - `PageBeanUserDetails` renamed to `PageUserDetails`,
  - `PageBeanUserKey` renamed to `PageUserKey`,
  - `PageBeanVersion` renamed to `PageVersion`,
  - `PageBeanWebhook` renamed to `PageWebhook`,
  - `PageBeanWorkflow` renamed to `PageWorkflow`,
  - `PageBeanWorkflowScheme` renamed to `PageWorkflowScheme`,
  - `PageBeanWorkflowTransitionRules` renamed to `PageWorkflowTransitionRules`,
  - `PermissionsKeysBean` renamed to `PermissionsKeys`,
  - `ProjectIdentifierBean` renamed to `ProjectIdentifier`,
  - `ProjectInputBean` renamed to `ProjectInput`,
  - `ProjectRoleActorsUpdateBean` renamed to `ProjectRoleActorsUpdate`,
  - `SearchRequestBean` renamed to `SearchRequest`,
  - `SharePermissionInputBean` renamed to `SharePermissionInput`,
  - `SimpleApplicationPropertyBean` renamed to `SimpleApplicationProperty`,
  - `UpdateUserToGroupBean` renamed to `UpdateUserToGroup`,
  - `UserBean` renamed to `DashboardUser`,
  - `UserBeanAvatarUrls` renamed to `UserAvatarUrls`,
  - `UserMigrationBean` renamed to `UserMigration`,
  - `UserWriteBean` renamed to `UserWrite`,
  - `VersionMoveBean` renamed to `VersionMove`,
  - `WorklogIdsRequestBean` renamed to `WorklogIdsRequest`,
  - `TaskProgressBeanObject` renamed to `TaskProgressObject`,
  - `TaskProgressBeanRemoveOptionFromIssuesResult` renamed to `TaskProgressRemoveOptionFromIssuesResult`,

### 2.5.2

- Common fixes:
  - Vulnerabilities fixed
- Agile:
  - `BoardAdminsBean` renamed to `BoardAdmins`
  - `BoardBean` renamed to `Board`
  - `BoardConfigBean` renamed to `BoardConfig`
  - `BoardCreateBean` renamed to `BoardCreate`
  - `BoardFeatureBean` renamed to `BoardFeature`
  - `BoardFeatureResponseBean` renamed to `BoardFeatureResponse`
  - `BoardFeatureToggleRequestBean` renamed to `BoardFeatureToggleRequest`
  - `BoardFilterBean` renamed to `BoardFilter`
  - `BoardLocationBean` renamed to `BoardLocation`
  - `ChangeHistoryBean` renamed to `ChangeHistory`
  - `ChangeItemBean` renamed to `ChangeItem`
  - `ChangelogBean` renamed to `Changelog`
  - `ColorBean` renamed to `Color`
  - `ColumnBean` renamed to `Column`
  - `ColumnConfigBean` renamed to `ColumnConfig`
  - `EditMetaBean` renamed to `EditMeta`
  - `EpicRankRequestBean` renamed to `EpicRankRequest`
  - `EpicUpdateBean` renamed to `EpicUpdate`
  - `EstimationConfigBean` renamed to `EstimationConfig`
  - `EstimationFieldBean` renamed to `EstimationField`
  - `FieldEditBean` renamed to `FieldEdit`
  - `FieldMetaBean` renamed to `FieldMeta`
  - `IssueAssignRequestBean` renamed to `IssueAssignRequest`
  - `IssueBean` renamed to `Issue`
  - `IssueRankRequestBean` renamed to `IssueRankRequest`
  - `IssueTransitionBean` renamed to `IssueTransition`
  - `JsonTypeBean` renamed to `JsonType`
  - `LinkGroupBean` renamed to `LinkGroup`
  - `LocationBean` renamed to `Location`
  - `PageBean` renamed to `Page`
  - `PageBeanBoardBean` renamed to `PageBoard`
  - `PageBeanBoardFilterBean` renamed to `PageBoardFilter`
  - `PartialSuccessBean` renamed to `PartialSuccess`
  - `QuickFilterBean` renamed to `QuickFilter`
  - `RankingConfigBean` renamed to `RankingConfig`
  - `RelationBean` renamed to `Relation`
  - `ReportBean` renamed to `Report`
  - `ReportsResponseBean` renamed to `ReportsResponse`
  - `SearchResultsBean` renamed to `SearchResults`
  - `SimpleLinkBean` renamed to `SimpleLink`
  - `SprintCreateBean` renamed to `SprintCreate`
  - `SprintSwapBean` renamed to `SprintSwap`
  - `StatusCategoryJsonBean` renamed to `StatusCategoryJson`
  - `StatusJsonBean` renamed to `StatusJson`
  - `SubqueryBean` renamed to `Subquery`
  - `UserJsonBean` renamed to `UserJson`
  - `GroupBean` renamed to `Group`
  - `PageBeanQuickFilterBean` renamed to `PageBeanQuickFilter`
  - `OpsbarBean` renamed to `Opsbar`
  - `PageBeanQuickFilter` renamed to `PageBeanQuickFilter`
- Version 2:
  - `ActorInputBean` renamed to `ActorInput`
  - `AddFieldBean` renamed to `AddField`
  - `AddGroupBean` renamed to `AddGroup`
  - `AssociatedItemBean` renamed to `AssociatedItem`
  - `AuditRecordBean` renamed to `AuditRecord`
  - `AvatarUrlsBean` renamed to `AvatarUrls`
  - `BulkPermissionsRequestBean` renamed to `BulkPermissionsRequest`
  - `ChangedValueBean` renamed to `ChangedValue`
  - `CreateUpdateRoleRequestBean` renamed to `CreateUpdateRoleRequest`
  - `CustomFieldDefinitionJsonBean` renamed to `CustomFieldDefinitionJson`
  - `UserBean` renamed to `DashboardUser`
  - `DeleteAndReplaceVersionBean` renamed to `DeleteAndReplaceVersion`
  - `GlobalScopeBean` renamed to `GlobalScope`
  - `IdBean` renamed to `Id`
  - `IdOrKeyBean` renamed to `IdOrKey`
  - `IssueBean` renamed to `Issue`
  - `IssueCommentListRequestBean` renamed to `IssueCommentListRequest`
  - `IssueFieldOptionCreateBean` renamed to `IssueFieldOptionCreate`
  - `IssueFieldOptionScopeBean` renamed to `IssueFieldOptionScope`
  - `IssuesJqlMetaDataBean` renamed to `IssuesJqlMetaData`
  - `IssuesMetaBean` renamed to `IssuesMeta`
  - `IssuesUpdateBean` renamed to `IssuesUpdate`
  - `IssueTypeCreateBean` renamed to `IssueTypeCreate`
  - `IssueTypeUpdateBean` renamed to `IssueTypeUpdate`
  - `JiraExpressionEvalContextBean` renamed to `JiraExpressionEvalContext`
  - `JiraExpressionEvalRequestBean` renamed to `JiraExpressionEvalRequest`
  - `JiraExpressionEvaluationMetaDataBean` renamed to `JiraExpressionEvaluationMetaData`
  - `JiraExpressionsComplexityBean` renamed to `JiraExpressionsComplexity`
  - `JiraExpressionsComplexityValueBean` renamed to `JiraExpressionsComplexityValue`
  - `JsonTypeBean` renamed to `JsonType`
  - `LinkIssueRequestJsonBean` renamed to `LinkIssueRequestJson`
  - `MoveFieldBean` renamed to `MoveField`
  - `PageBeanChangelog` renamed to `PageChangelog`
  - `PageBeanComment` renamed to `PageComment`
  - `PageBeanComponentWithIssueCount` renamed to `PageComponentWithIssueCount`
  - `PageBeanContext` renamed to `PageContext`
  - `PageBeanContextForProjectAndIssueType` renamed to `PageContextForProjectAndIssueType`
  - `PageBeanCustomFieldContext` renamed to `PageCustomFieldContext`
  - `PageBeanCustomFieldContextDefaultValue` renamed to `PageCustomFieldContextDefaultValue`
  - `PageBeanCustomFieldContextOption` renamed to `PageCustomFieldContextOption`
  - `PageBeanCustomFieldContextProjectMapping` renamed to `PageCustomFieldContextProjectMapping`
  - `PageBeanCustomFieldOptionDetails` renamed to `PageCustomFieldOptionDetails`
  - `PageBeanDashboard` renamed to `PageDashboard`
  - `PageBeanField` renamed to `PageField`
  - `PageBeanFieldConfiguration` renamed to `PageFieldConfiguration`
  - `PageBeanFieldConfigurationIssueTypeItem` renamed to `PageFieldConfigurationIssueTypeItem`
  - `PageBeanFieldConfigurationItem` renamed to `PageFieldConfigurationItem`
  - `PageBeanFieldConfigurationScheme` renamed to `PageFieldConfigurationScheme`
  - `PageBeanFieldConfigurationSchemeProjects` renamed to `PageFieldConfigurationSchemeProjects`
  - `PageBeanFilterDetails` renamed to `PageFilterDetails`
  - `PageBeanGroupDetails` renamed to `PageGroupDetails`
  - `PageBeanIssueFieldOption` renamed to `PageIssueFieldOption`
  - `PageBeanIssueSecurityLevelMember` renamed to `PageIssueSecurityLevelMember`
  - `PageBeanIssueTypeScheme` renamed to `PageIssueTypeScheme`
  - `PageBeanIssueTypeSchemeMapping` renamed to `PageIssueTypeSchemeMapping`
  - `PageBeanIssueTypeSchemeProjects` renamed to `PageIssueTypeSchemeProjects`
  - `PageBeanIssueTypeScreenScheme` renamed to `PageIssueTypeScreenScheme`
  - `PageBeanIssueTypeScreenSchemeItem` renamed to `PageIssueTypeScreenSchemeItem`
  - `PageBeanIssueTypeScreenSchemesProjects` renamed to `PageIssueTypeScreenSchemesProjects`
  - `PageBeanIssueTypeToContextMapping` renamed to `PageIssueTypeToContextMapping`
  - `PageBeanNotificationScheme` renamed to `PageNotificationScheme`
  - `PageBeanProject` renamed to `PageProject`
  - `PageBeanScreen` renamed to `PageScreen`
  - `PageBeanScreenScheme` renamed to `PageScreenScheme`
  - `PageBeanScreenWithTab` renamed to `PageScreenWithTab`
  - `PageBeanString` renamed to `PageString`
  - `PageBeanUser` renamed to `PageUser`
  - `PageBeanUserDetails` renamed to `PageUserDetails`
  - `PageBeanUserKey` renamed to `PageUserKey`
  - `PageBeanVersion` renamed to `PageVersion`
  - `PageBeanWebhook` renamed to `PageWebhook`
  - `PageBeanWorkflow` renamed to `PageWorkflow`
  - `PageBeanWorkflowScheme` renamed to `PageWorkflowScheme`
  - `PageBeanWorkflowTransitionRules` renamed to `PageWorkflowTransitionRules`
  - `PermissionsKeysBean` renamed to `PermissionsKeys`
  - `ProjectIdentifierBean` renamed to `ProjectIdentifier`
  - `ProjectInputBean` renamed to `ProjectInput`
  - `ProjectRoleActorsUpdateBean` renamed to `ProjectRoleActorsUpdate`
  - `ProjectScopeBean` renamed to `ProjectScope`
  - `SearchRequestBean` renamed to `SearchRequest`
  - `SharePermissionInputBean` renamed to `SharePermissionInput`
  - `SimpleApplicationPropertyBean` renamed to `SimpleApplicationProperty`
  - `TaskProgressBeanObject` renamed to `TaskProgressObject`
  - `TaskProgressBeanRemoveOptionFromIssuesResult` renamed to `TaskProgressRemoveOptionFromIssuesResult`
  - `UpdateUserToGroupBean` renamed to `UpdateUserToGroup`
  - `UserBeanAvatarUrls` renamed to `UserAvatarUrls`
  - `UserMigrationBean` renamed to `UserMigration`
  - `UserWriteBean` renamed to `UserWrite`
  - `VersionMoveBean` renamed to `VersionMove`
  - `WorklogIdsRequestBean` renamed to `WorklogIdsRequest`

### 2.5.1

- Version 3:
  - `duedate` property added to `Fields` model.
  - `issuelinks` property added to `Fields` model.
  - `environemnt` property added to `Fields` model.
  - `parent` property added to `Fields` model.
  - `expand` property in `GetIssue` improved.
- Version 2:
  - `duedate` property added to `Fields` model.
  - `issuelinks` property added to `Fields` model.
  - `environemnt` property added to `Fields` model.
  - `parent` property added to `Fields` model.
  - `expand` property in `GetIssue` improved.

### 2.5.0

- Agile:
  - JSDoc descriptions improved.
  - `BoardFeature` are deprecated. Use `Feature` instead.
  - `BoardFeatureResponseBean` are deprecated. Use `FeatureResponse` instead.
  - `BoardFeatureToggleRequest` are deprecated. Use `FeatureToggleRequest` instead.
  - Other minor improvements


- Version 3:
  - JSDoc descriptions improved.
  - `AppMigration` API support added.
  - `generateChangelog` property added to `IssueCustomFieldValuesApps.updateCustomFieldValue` request parameters.
  - `hierarchyLevel` property added to `IssueTypes.createIssueType`.
  - `getChangeLogsByIds` method added to `Issues`.
  - New models added:
    - `ConnectCustomFieldValue`
    - `ConnectCustomFieldValues`
    - `EntityPropertyDetails`
    - `IssueChangelogIds`
    - `GetChangeLogsByIds`
  - Mistake in `CrateWorkflowStatusDetails` fixed. Current name is correct: `CreateWorkflowStatusDetails`.
  - `fieldIdsFilter`, `issuePropertyKeysFilter` properties added to `Webhook` and `WebhookDetails` models.
  - Other minor improvements

- Version 2:
  - JSDoc descriptions improved.
  - `AppMigration` API support added.
  - `generateChangelog` property added to `IssueCustomFieldValuesApps.updateCustomFieldValue` request parameters.
  - `hierarchyLevel` property added to `IssueTypes.createIssueType`.
  - `getChangeLogsByIds` method added to `Issues`.
  - New models added:
    - `ConnectCustomFieldValue`
    - `ConnectCustomFieldValues`
    - `EntityPropertyDetails`
    - `IssueChangelogIds`
    - `PageBeanContextualConfiguration`
    - `GetChangeLogsByIds`
  - Mistake in `CrateWorkflowStatusDetails` fixed. Current name is correct: `CreateWorkflowStatusDetails`.
  - `fieldIdsFilter`, `issuePropertyKeysFilter` properties added to `Webhook` and `WebhookDetails` models.
  - Other minor improvements

### 2.4.2

- [#144](https://github.com/MrRefactoring/jira.js/issues/144) Fixed error when tried vote issue. Thanks [João Lopes](https://github.com/lopis)!
- A lot of small improvements in types for agile and for project API

### 2.4.1

- A lot of small improvements in types for agile and for project API

### 2.4.0

- Some properties to some endpoints added :D
- [IssueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-) group added
- [#136](https://github.com/MrRefactoring/jira.js/pull/136) Fixed all URLs for Cloud Agile endpoint. Thanks [John Brunton](https://github.com/jbrunton)!
- Internal code styles improved

### 2.3.0

- Huge type improvements

### 2.2.1

- Types error fixed [#124](https://github.com/MrRefactoring/jira.js/issues/124)

### 2.2.0

- Fixed [bug](https://github.com/MrRefactoring/jira.js/issues/120) with transition model
- Telemetry names changed
- Instance information API added
- Issue custom field values apps API added

### 2.1.1

- Typings improved
- Fixed [bug](https://github.com/MrRefactoring/jira.js/issues/117) with typings in createIssue

### 2.1.0

- Typings improved
- projectFeatures API added
- small improvements

### 2.0.6

- searchForIssuesUsingJql request fixed

### 2.0.5

- addAttachment fixed for browsers

### 2.0.4

- addAttachment fixed for browsers

### 2.0.3

- Improved typing
- Fixed the bug that it was impossible to attach an attachment to an issue
- Other small improvements

### 2.0.2

- `Buffer.from` replaced to raw JS code in Basic authorization
- Telemetry config type fixed
- `noCheckAtlassianToken` flag added to config (`X-Atlassian-Token: no-check`)
- Typing improves

### 2.0.1

- Types bug fixes

### 2.0.0

- One client divided to three: [Agile](https://developer.atlassian.com/cloud/jira/software/rest/intro/), [Version2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/), [Version3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- Improved type system
- A redesigned facade and internal structure of the project
- Added telemetry

## Previous major version:

<details>

### 1.8.0

- Authentication: Added [OAuth 1.0](https://developer.atlassian.com/server/jira/platform/oauth/) authentication method
- CI: Migrated from `Travis CI` to `Github CI`

### 1.7.3

- DEPENDENCIES: `atlassian-jwt` installed from npm instead git
- DEPENDENCIES: Updated dependencies versions
- README: Contributors section added, small redesign

### 1.7.2

- FIX: console.log removed

### 1.7.1

- FIX: Headers fixes

### 1.7.0

- IMPROVEMENT: Readme examples updated
---
- IMPROVEMENT: Config typings refactored
- DEPRECATION: Property `timeout` deprecated in `Config`
---
- FEATURE: Property `middlewares` added to `Config`
---
- FEATURE: Property `baseRequestConfig` added to `Config`
---
- FEATURE: Method `getOptionsForContext` added to `IssueCustomFieldOptions` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options/#api-rest-api-2-customfield-fieldid-context-contextid-option-get)
- FEATURE: Method `deleteCustomFieldOption` added to `IssueCustomFieldOptions` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options/#api-rest-api-2-customfield-fieldid-context-contextid-option-optionid-delete)
---
- FEATURE: Method `changeOrderOfIssueTypes` added to `IssueTypeSchemes` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-type-schemes/#api-rest-api-2-issuetypescheme-issuetypeschemeid-issuetype-move-put)
---
- FEATURE: Method `assignWorkflowSchemeToProject` added to `WorkflowSchemeProjectAssociations` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-scheme-project-associations/#api-rest-api-2-workflowscheme-project-put)
---
- FEATURE: New API `ScreenSchemes` added. [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-schemes/#api-group-screen-schemes).
- FEATURE: New API `ScreenTabFields` added [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tab-fields/#api-group-screen-tab-fields)
- FEATURE: New API `ScreenTabs` added [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tabs/)
---
- FEATURE: Added models for new endpoints


### 1.6.2

- FIX: Sprints added to client
- IMPROVEMENT: Dependencies updated

### 1.6.1

- FIX: Added the ability to use the library without authorization [#75](https://github.com/MrRefactoring/jira.js/pull/75)

### 1.6.0

- FEATURE: New API `IssueTypeScreenSchemes` added
- FEATURE: New API `ProjectEmail` added
---
- FEATURE: Method `bulkGetGroups` added to `Groups`
- FEATURE: Method `restoreDeletedProject` added to `Projects`
- FEATURE: Method `createIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `deleteIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `updateIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `addIssueTypesToIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `deleteIssueTypeFromIssueTypeScheme` added to `IssueTypeSchemes`
---
- FEATURE: Property `id` added to `IssueFieldConfigurations.getAllFieldConfigurations`
- FEATURE: Property `sortByOpsBarAndStatus` added to `Issues.getTransitions`
- FEATURE: Property `accountId` added to `Permissions.getBulkPermissions`
---
- DEPRECATION: Method `getIssueTypeScreenSchemes` are deprecated in `Screens`
- DEPRECATION: Method `getIssueTypeScreenSchemeItems` are deprecated in `Screens`
- DEPRECATION: Method `getIssueTypeScreenSchemesForProjects` are deprecated in `Screens`

### 1.5.0

- FEATURE: Method `getAllFieldConfigurationSchemes` added to `IssueFieldConfigurations`
- FEATURE: Method `getFieldConfigurationSchemesForProjects` added to `IssueFieldConfigurations`
- FEATURE: Property `fieldConfigurationSchemeId` added to `issueFieldConfigurations.getFieldConfigurationIssueTypeItems`
- FEATURE: Method `getIssueSecurityLevelMembers` added to `IssueSecurityLevel`
- FEATURE: Issue type schemes API added
- FEATURE: Method `getLicensedProjectTypes` added to `ProjectTypes`
- FEATURE: Method `deleteProjectAsynchronously` added to `Projects`
- FEATURE: Method `getIssueTypeScreenSchemes` added to `Screens`
- FEATURE: Method `getAllScreenSchemes` renamed to `getScreenSchemes`
- DEPRECATION: `getAllScreenSchemes` are deprecated (Renamed to `getScreenSchemes`)

### 1.4.0

- FEATURE: Now requests where there are no required parameters do not have to pass an empty object to make a request
- FEATURE: `dashboards.createDashboard` was added
- FEATURE: `dashboards.updateDashboard` was added
- FEATURE: `dashboards.deleteDashboard` was added
- FEATURE: `dashboards.copyDashboard` was added
- FEATURE: `screens.getIssueTypeScreenSchemesForProjects` was added
- FEATURE: `issueFieldConfigurations.getAllFieldConfiguration` was added
- FEATURE: `issueFieldConfigurations.getFieldConfigurationItems` was added
- FEATURE: `issueFieldConfigurations.getFieldConfigurationIssueTypeItems` was added
- FEATURE: In `issues.getTransitions` was added `includeUnavailableTransitions` property
- DEPRECATION: `issueFields.getFieldConfigurationItems` are deprecated (Removed from official API, use `issueFieldConfigurations.getFieldConfigurationItems`). Will be removed in next major version

### 1.3.0

- FEATURE: `jiraExpressions.analyseJiraExpression` was added
- FEATURE: `screens.getIssueTypeScreenSchemeItems` was added
- FEATURE: In `projects.getProjectsPaginated` was added `status` property
- FEATURE: In `projects.deleteProject` was added `enableUndo` property
- DEPRECATION: `timeTracking.disableTimeTracking` are deprecated (Removed from official API). Will be removed in next major version

### 1.2.0

- FEATURE: `issueFields.getAllFieldConfigurations` added as experimental
- FEATURE: `issueFields.getFieldConfigurationItems` added as experimental
- IMPROVEMENT: dependencies update

### 1.1.1

- FIX: `strictGDPR` feature fixed
- FIX: `Cannot read property 'Authorization' of undefined` fixed

### 1.1.0

- FEATURE: `strictGDPR` property added to Config. Allows use only [GDPR-compliant functionality](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
- FEATURE: `users.getAllUsersDefault` added
- FEATURE: `issueCustomFieldOptions.updateCustomFieldOptions` added as experimental
- DEPRECATION: `projectRoleActors.getActorsCountForProjectRole` are deprecated (Removed from official API). Will be removed in next major version

### 1.0.3

- DEPRECATION: `permissionsSchemes` and `issueAttachment` are deprecated
- IMPROVEMENT: agile api typings improved
- IMPROVEMENT: dependencies update
- FIX: Authorization parameter excluded for agile API in the request body

### 1.0.2

- FIX: JWT Authentication default expire time added
- IMPROVEMENT: modified `atlassian-jwt` (removed lodash from dependencies, bundle size decreased)
- IMPROVEMENT: small tests for authentication added

### 1.0.1

- FIX: documentation link fixed

### 1.0.0

- RELEASE

</details>
