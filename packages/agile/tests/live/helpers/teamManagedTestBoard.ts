import { type CloudClient } from '@jira.js/cloud';
import { type createAgileClient } from '../../../src/createAgileClient';

// Team-managed (next-gen) projects auto-create a board on creation and support the
// getFeaturesForBoard / toggleFeatures / moveIssuesToBoard APIs that classic boards do not.

const TEAM_MANAGED_TEMPLATE = {
  scrum: 'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum',
  kanban: 'com.pyxis.greenhopper.jira:gh-simplified-agility-kanban',
} as const;

export interface TeamManagedTestBoard {
  boardId: number;
  projectKey: string;
  projectId: string;
}

function randomKey(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const bytes = new Uint8Array(5);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => letters[byte % 26]!).join('');
}

export async function createTeamManagedTestBoard(
  agile: ReturnType<typeof createAgileClient>,
  cloud: CloudClient,
  accountId: string,
  type: 'scrum' | 'kanban' = 'scrum',
): Promise<TeamManagedTestBoard> {
  const suffix = `${Date.now()}-${globalThis.crypto.randomUUID().slice(0, 8)}`;

  const project = await cloud.projects.createProject({
    key: randomKey(),
    name: `sdk-live-tm-${suffix}`,
    projectTypeKey: 'software',
    projectTemplateKey: TEAM_MANAGED_TEMPLATE[type],
    leadAccountId: accountId,
  });

  const projectId = String(project.id);

  // Team-managed projects auto-create a board — discover it
  const boards = await agile.board.getAllBoards({ projectKeyOrId: project.key });
  const board = boards.values?.[0];

  if (board?.id == null) {
    await cloud.projects.deleteProject({ projectIdOrKey: projectId }).catch(() => {});
    throw new Error(`No board found for team-managed ${type} project ${project.key}`);
  }

  return { boardId: board.id, projectKey: project.key, projectId };
}

export async function destroyTeamManagedTestBoard(cloud: CloudClient, board: TeamManagedTestBoard): Promise<void> {
  // Deleting the project also removes the board
  await cloud.projects.deleteProject({ projectIdOrKey: board.projectId }).catch(() => {});
}
