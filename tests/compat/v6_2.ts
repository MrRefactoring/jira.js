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

export const customField: any = issue.fields?.customfield_10016;
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
export const optionalResponseField: FieldMetadata = {
  key: 'summary',
  name: 'Summary',
  operations: ['set'],
  required: true,
};
export const entityProperties: IssueEntityProperties = { properties: { nested: { valid: true } } };
export const arbitraryJson: any = entityProperties.properties?.nested;
export const dashboardUser: DashboardUser = { emailAddress: 'user@example.com', locale: 'en-US' };
export const currentUser: User = { emailAddress: null, locale: null };
