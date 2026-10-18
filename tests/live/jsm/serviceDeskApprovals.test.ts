import { describe, expect, inject, it } from 'vitest';
import { platform, serviceDesk } from './setup/client';
import { deskFixtures } from './serviceDeskHelpers';
import { assetName } from './setup/naming';

describe.runIf(inject('jsmFixtures').serviceDeskLicensed)('licensed service desk approvals', () => {
  const api = serviceDesk();

  it('reads a pending approval, checks its comment rules, approves it and reads the decision back', async () => {
    const { serviceDeskId, approvalRequestTypeId, customerUsername, approverUsername, approverFieldId } =
      deskFixtures();
    const request = await api.customerRequests.createCustomerRequest({
      serviceDeskId,
      requestTypeId: approvalRequestTypeId,
      raiseOnBehalfOf: customerUsername,
      requestFieldValues: { summary: assetName('approval request'), description: 'Created by the approval live test.' },
    });
    expect(request.issueKey).toBeTypeOf('string');
    expect(request.currentStatus?.status).toBeTypeOf('string');
    const issueIdOrKey = request.issueKey!;
    await platform().issues.editIssue({ issueIdOrKey, fields: { [approverFieldId]: [{ name: approverUsername }] } });
    await expect
      .poll(async () => (await api.approvals.getApprovals({ issueIdOrKey })).values?.[0]?.canAnswerApproval, {
        timeout: 15_000,
      })
      .toBe(true);
    const approvals = await api.approvals.getApprovals({ issueIdOrKey });
    const approvalId = approvals.values?.[0]?.id;
    expect(approvalId).toMatch(/^\d+$/);
    const pending = await api.approvals.getApprovalById({ issueIdOrKey, approvalId: approvalId! });
    expect(pending.finalDecision).toBe('pending');
    expect(pending.canAnswerApproval).toBe(true);
    const config = await api.approvals.getApprovalCommentConfig({ issueIdOrKey, approvalId: approvalId! });
    expect(config.commentsRequiredWhenApprove).toBeTypeOf('boolean');
    expect(config.commentsRequiredWhenDecline).toBeTypeOf('boolean');
    const approved = await api.approvals.answerApproval({
      issueIdOrKey,
      approvalId: approvalId!,
      decision: 'approve',
      comment: assetName('approval comment'),
      commentPublic: true,
    });
    expect(approved.finalDecision).toBe('approved');
    const read = await api.approvals.getApprovalById({ issueIdOrKey, approvalId: approvalId! });
    expect(read.finalDecision).toBe('approved');
    expect(read.canAnswerApproval).toBe(false);
    await expect
      .poll(
        async () => {
          const after = await api.customerRequests.getCustomerRequestByIdOrKey({ issueIdOrKey });
          expect(after.currentStatus?.status).toBeTypeOf('string');
          return after.currentStatus!.status;
        },
        { timeout: 15_000 },
      )
      .not.toBe(request.currentStatus?.status);
  });
});
