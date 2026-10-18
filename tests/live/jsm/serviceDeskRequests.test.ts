import { describe, expect, inject, it } from 'vitest';
import { serviceDesk } from './setup/client';
import { deskFixtures, raiseRequest } from './serviceDeskHelpers';
import { assetName } from './setup/naming';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desk requests', () => {
  const api = serviceDesk();

  it('creates a request, reads it by key and finds its status and the callers list', async () => {
    const issueIdOrKey = await raiseRequest('request');
    const read = await api.customerRequests.getCustomerRequestByIdOrKey({ issueIdOrKey });
    expect(read.issueKey).toBe(issueIdOrKey);
    expect(read.currentStatus?.status).toBeTypeOf('string');
    const status = await api.customerRequests.getCustomerRequestStatus({ issueIdOrKey });
    expect(status.values?.length).toBeGreaterThan(0);
    expect(status.values![0]?.status).toBe(read.currentStatus?.status);
    const listed = await api.customerRequests.getMyCustomerRequests({
      serviceDeskId: deskFixtures().serviceDeskId,
      limit: 50,
    });
    expect(listed.values).toContainEqual(expect.objectContaining({ issueKey: issueIdOrKey }));
  });

  it('creates a comment and finds it by id and in the list', async () => {
    const issueIdOrKey = await raiseRequest('commented request');
    const body = assetName('comment');
    const created = await api.customerRequests.createRequestComment({ issueIdOrKey, body, public: true });
    expect(created.id).toBeTypeOf('string');
    const commentId = created.id!;
    const read = await api.customerRequests.getRequestCommentById({ issueIdOrKey, commentId });
    expect(read.body).toBe(body);
    const listed = await api.customerRequests.getRequestComments({ issueIdOrKey });
    expect(listed.values).toContainEqual(expect.objectContaining({ id: commentId, body }));
  });

  it('adds, lists and removes a customer as a request participant', async () => {
    const issueIdOrKey = await raiseRequest('shared request');
    const { customerUsername } = deskFixtures();
    await api.customerRequests.addRequestParticipants({ issueIdOrKey, usernames: [customerUsername] });
    const added = await api.customerRequests.getRequestParticipants({ issueIdOrKey });
    expect(added.values).toContainEqual(expect.objectContaining({ name: customerUsername }));
    await api.customerRequests.removeRequestParticipants({ issueIdOrKey, usernames: [customerUsername] });
    const removed = await api.customerRequests.getRequestParticipants({ issueIdOrKey });
    expect(removed.values).not.toContainEqual(expect.objectContaining({ name: customerUsername }));
  });

  it('reads an SLA from a newly created request', async () => {
    const issueIdOrKey = await raiseRequest('timed request');
    await expect
      .poll(async () => (await api.customerRequests.getSlaInformation({ issueIdOrKey })).values?.length, {
        timeout: 15_000,
      })
      .toBeGreaterThan(0);
    const listed = await api.customerRequests.getSlaInformation({ issueIdOrKey });
    const slaMetricId = listed.values?.[0]?.id;
    expect(slaMetricId).toBeTypeOf('string');
    const loaded = await api.customerRequests.getSlaInformationById({ issueIdOrKey, slaMetricId: slaMetricId! });
    expect(loaded.id).toBe(slaMetricId);
  });

  it('performs an available customer transition and reads the new status', async () => {
    const issueIdOrKey = await raiseRequest('transitioned request');
    const before = await api.customerRequests.getCustomerRequestByIdOrKey({ issueIdOrKey });
    expect(before.currentStatus?.status).toBeTypeOf('string');
    const transitions = await api.customerTransitions.getCustomerTransitions({ issueIdOrKey });
    const transition = transitions.values?.[0];
    expect(transition?.id).toBeTypeOf('string');
    await api.customerTransitions.performCustomerTransition({ issueIdOrKey, id: transition!.id! });
    const after = await api.customerRequests.getCustomerRequestByIdOrKey({ issueIdOrKey });
    expect(after.currentStatus?.status).toBeTypeOf('string');
    expect(after.currentStatus?.status).not.toBe(before.currentStatus?.status);
  });

  it('uploads a temporary attachment and attaches that file to a request', async () => {
    const issueIdOrKey = await raiseRequest('attached request');
    const { serviceDeskId } = deskFixtures();
    const uploaded = await api.requestAttachments.attachTemporaryFile({
      serviceDeskId,
      body: { filename: 'jira-js.txt', content: 'Attached by the jira.js live suite.' },
    });
    const temporaryId = uploaded.temporaryAttachments?.[0]?.temporaryAttachmentId;
    expect(temporaryId).toBeTypeOf('string');
    const attached = await api.requestAttachments.createAttachment({
      issueIdOrKey,
      temporaryAttachmentIds: [temporaryId!],
      public: true,
    });
    expect(attached.attachments).toContainEqual(expect.objectContaining({ filename: 'jira-js.txt' }));
  });

  it('lists approvals on an existing customer request', async () => {
    const issueIdOrKey = await raiseRequest('request without approval');
    const approvals = await api.approvals.getApprovals({ issueIdOrKey });
    expect(approvals.values).toEqual([]);
  });
});
