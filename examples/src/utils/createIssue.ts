import type { Version3Client } from 'jira.js';

export const createIssue = async (client: Version3Client) => {
  const { values: projects } = await client.projects.searchProjects();

  if (projects.length) {
    const { key } = projects[0];

    const { id } = await client.issues.createIssue({
      fields: {
        summary: 'My first issue',
        issuetype: {
          name: 'Task',
        },
        project: {
          key,
        },
      },
    });

    return client.issues.getIssue({ issueIdOrKey: id });
  }

  throw new Error('First create a project');
};
