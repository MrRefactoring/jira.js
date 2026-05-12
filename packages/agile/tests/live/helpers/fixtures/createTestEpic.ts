import { z } from 'zod';
import type { Client } from '@jira.js/base';

const IssueCreatedSchema = z.object({
  id: z.string(),
  key: z.string(),
});

const ProjectIssueTypesSchema = z.object({
  issueTypes: z.array(z.object({ id: z.string(), name: z.string() })),
});

export async function findEpicIssueTypeId(http: Client, projectKey: string): Promise<string> {
  const project = await http.sendRequest({
    url: `/rest/api/3/project/${projectKey}`,
    method: 'GET',
    schema: ProjectIssueTypesSchema,
  });

  const epic = project.issueTypes.find(t => t.name === 'Epic');

  if (!epic) {
    throw new Error(
      `Epic issue type not found in project ${projectKey}. Available types: ${project.issueTypes.map(t => t.name).join(', ')}`,
    );
  }

  return epic.id;
}

export async function createTestEpic(
  http: Client,
  projectKey: string,
  epicTypeId: string,
): Promise<{ id: string; key: string; summary: string; name: string }> {
  const summary = `sdk-live-epic-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  const created = await http.sendRequest({
    url: '/rest/api/3/issue',
    method: 'POST',
    body: {
      fields: {
        project: { key: projectKey },
        summary,
        issuetype: { id: epicTypeId },
        customfield_10011: summary,
      },
    },
    schema: IssueCreatedSchema,
  });

  return { ...created, summary, name: summary };
}
