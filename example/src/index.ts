import { Version3Client } from 'jira.js';

const host = '';
const email = '';
const apiToken = '';

if (!host) {
  throw new Error('Please specify host');
} else if (!email) {
  throw new Error('Please specify email');
} else if (!apiToken) {
  throw new Error('Please specify apiToken');
}

const client = new Version3Client({
  host,
  authentication: {
    basic: {
      email,
      apiToken,
    },
  },
  newErrorHandling: true,
});

async function main() {
  const projects = await client.projects.getAllProjects();

  if (projects.length) {
    const project = projects[0];

    const { id } = await client.issues.createIssue({
      fields: {
        summary: 'My first issue',
        issuetype: {
          name: 'Task'
        },
        project: {
          key: project.key,
        },
      }
    });

    const issue = await client.issues.getIssue({ issueIdOrKey: id });

    console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project.`);
  } else {
    const myself = await client.myself.getCurrentUser();

    const { id } = await client.projects.createProject({
      key: 'PROJECT',
      name: "My Project",
      leadAccountId: myself.accountId,
      projectTypeKey: 'software',
    });

    const project = await client.projects.getProject({ projectIdOrKey: id.toString() });

    console.log(`Project '${project.name}' was successfully created.`);
  }
}

main();
