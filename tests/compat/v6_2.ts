import { z } from 'zod';
import { createAgileClient, createCloudClient } from '@jirajs';
import {
  IssueSchema,
  type DashboardUser,
  type FieldMetadata,
  type Issue,
  type IssueEntityProperties,
  type TaskProgressObject,
  type User,
} from '#/cloud/models';

const config = {
  host: 'https://example.atlassian.net',
  auth: { type: 'basic' as const, email: 'user@example.com', apiToken: 'token' },
};

const cloud = createCloudClient(config);
const agile = createAgileClient(config);
const issue = {} as Issue;

export const customField: string = issue.fields?.customfield_10016.value;
export const extendedIssueSchema = IssueSchema.extend({ local: z.string().optional() });
export const issueShape = IssueSchema.shape;
export const selectedProvider: Promise<void> = cloud.timeTracking.getSelectedTimeTrackingImplementation();
export const movedIssues: Promise<void> = agile.board.moveIssuesToBoard({ boardId: 1, issues: ['EX-1'] });
export const updatedSchemes: Promise<TaskProgressObject> = cloud.workflowSchemes.updateSchemes({
  description: 'Example',
  id: '1',
  name: 'Example',
  version: {},
});
export const updatedPrecomputations: Promise<void> = cloud.jqlFunctionsApps.updatePrecomputations({ values: [] });
export const publishedDraft: Promise<void> = cloud.workflowSchemeDrafts.publishDraftWorkflowScheme({ id: 1 });
export const currentUser: Promise<DashboardUser> = cloud.myself.getCurrentUser();
export const foundUsers: Promise<DashboardUser[]> = cloud.userSearch.findUsers();
export const optionalResponseField: FieldMetadata = {
  key: 'summary',
  name: 'Summary',
  operations: ['set'],
  required: true,
};
export const entityProperties: IssueEntityProperties = { properties: { nested: { valid: true } } };
export const arbitraryJson: boolean = entityProperties.properties?.nested.valid;
export const dashboardUser: DashboardUser = { emailAddress: 'user@example.com', locale: 'en-US' };
export const nullableUser: User = { emailAddress: null, locale: null };
export const bareUser: DashboardUser = { accountId: 'x' };
