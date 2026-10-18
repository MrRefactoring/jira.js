import { expect, inject } from 'vitest';
import { serviceDesk } from './setup/client';
import { assetName } from './setup/naming';
import type { ServiceDeskFixtures } from './setup/serviceDeskFixtures';

export function deskFixtures(): ServiceDeskFixtures {
  const fixtures = inject('jsmFixtures').serviceDesk;
  expect(fixtures, 'The licensed suite requires a service desk fixture.').toBeDefined();
  return fixtures!;
}

export async function raiseRequest(label: string): Promise<string> {
  const { serviceDeskId, requestTypeId } = deskFixtures();
  const created = await serviceDesk().customerRequests.createCustomerRequest({
    serviceDeskId,
    requestTypeId,
    requestFieldValues: { summary: assetName(label), description: 'Created by the jira.js live suite.' },
  });
  expect(created.issueKey).toBeTypeOf('string');
  return created.issueKey!;
}
