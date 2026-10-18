import { connect, platform, serviceDesk } from './client';
import type { Cleanup } from './fixtures';
import { assetName, schemaKey } from './naming';
import { runId } from '../../helpers/naming';
import { z } from 'zod';

export interface ServiceDeskFixtures {
  serviceDeskId: string;
  projectKey: string;
  requestTypeId: string;
  issueTypeId: string;
  customerUsername: string;
  customerKey: string;
  approverUsername: string;
  approverFieldId: string;
  approvalRequestTypeId: string;
}

export async function createServiceDeskFixtures(cleanup: Cleanup[]): Promise<ServiceDeskFixtures> {
  const api = serviceDesk();
  const jira = platform();
  const customer = await api.customers.createCustomer({
    email: `jjs-${runId()}@example.invalid`,
    fullName: assetName('customer'),
  });
  if (!customer.name) throw new Error('Creating a customer returned no username.');
  const customerUsername = customer.name;
  cleanup.push(() => jira.users.removeUser({ username: customerUsername }));
  if (!customer.key) throw new Error('Creating a customer returned no key.');

  const me = await jira.myself.getCurrentUser();
  if (!me.name) throw new Error('The signed-in administrator returned no username.');
  const projectKey = schemaKey('D');
  const project = await jira.projects.createProject({
    key: projectKey,
    name: assetName('service desk'),
    lead: me.name,
    projectTypeKey: 'service_desk',
    projectTemplateKey: 'com.atlassian.servicedesk:basic-service-desk-project',
  });
  cleanup.push(() => jira.projects.deleteProject({ projectIdOrKey: projectKey }));
  if (!project.id) throw new Error('Creating a service project returned no id.');
  const desks = await api.serviceDesks.getServiceDesks();
  const desk = desks.values?.find(item => item.projectKey === projectKey);
  if (!desk?.id) throw new Error('The created project was not listed as a service desk.');
  const serviceDeskId = desk.id;
  await api.customers.addCustomers({ serviceDeskId, usernames: [customerUsername] });
  const types = await api.requestTypes.getRequestTypes({ serviceDeskId });
  const requestTypeId = types.values?.[0]?.id;
  if (!requestTypeId) throw new Error('The service desk template created no request types.');
  const details = z
    .object({ issueTypes: z.array(z.object({ id: z.string(), subtask: z.boolean() })) })
    .parse(await jira.projects.getProject({ projectIdOrKey: projectKey }));
  const issueTypeId = details.issueTypes.find(item => item.subtask !== true)?.id;
  if (!issueTypeId) throw new Error('The service project has no non-subtask issue type.');
  const fields = await jira.issueFields.getFields();
  const approverFieldId = fields.find(field => field.name === 'Approvers')?.id;
  if (!approverFieldId) throw new Error('The service desk template created no Approvers field.');
  let approvalRequestTypeId: string | undefined;
  for (const kind of types.values ?? []) {
    if (!kind.id) throw new Error('A template request type has no id.');
    const form = await api.requestTypes.getRequestTypeFields({ serviceDeskId, requestTypeId: kind.id });
    if (form.requestTypeFields?.some(field => field.fieldId === approverFieldId)) {
      approvalRequestTypeId = kind.id;
      break;
    }
  }
  if (!approvalRequestTypeId) throw new Error('The service desk template created no request type with approvers.');
  await connect().sendRequest({
    url: '/rest/internal/1.0/darkFeatures/sd.restricted.request.type.enabled',
    method: 'PUT',
    body: { enabled: 'true' },
  });
  return {
    serviceDeskId,
    projectKey,
    requestTypeId,
    issueTypeId,
    customerUsername,
    customerKey: customer.key,
    approverUsername: me.name,
    approverFieldId,
    approvalRequestTypeId,
  };
}
