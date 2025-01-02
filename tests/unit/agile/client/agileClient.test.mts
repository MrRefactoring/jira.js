import { describe, it, expect } from 'vitest';
import { AgileClient } from '@/agile/index.mjs';
import { Backlog } from '@/agile/backlog.mjs';
import { Board } from '@/agile/board.mjs';
import { Builds } from '@/agile/builds.mjs';
import { Deployments } from '@/agile/deployments.mjs';
import { DevelopmentInformation } from '@/agile/developmentInformation.mjs';
import { DevopsComponents } from '@/agile/devopsComponents.mjs';
import { Epic } from '@/agile/epic.mjs';
import { FeatureFlags } from '@/agile/featureFlags.mjs';
import { Issue } from '@/agile/issue.mjs';
import { Operations } from '@/agile/operations.mjs';
import { RemoteLinks } from '@/agile/remoteLinks.mjs';
import { SecurityInformation } from '@/agile/securityInformation.mjs';
import { Sprint } from '@/agile/sprint.mjs';

describe('AgileClient', () => {
  it('should have all required properties instantiated', () => {
    const client = new AgileClient({ host: 'http://localhost:3000' });

    // Verify each property exists and is an instance of the correct class
    expect(client.backlog).toBeInstanceOf(Backlog);
    expect(client.board).toBeInstanceOf(Board);
    expect(client.builds).toBeInstanceOf(Builds);
    expect(client.deployments).toBeInstanceOf(Deployments);
    expect(client.developmentInformation).toBeInstanceOf(DevelopmentInformation);
    expect(client.devopsComponents).toBeInstanceOf(DevopsComponents);
    expect(client.epic).toBeInstanceOf(Epic);
    expect(client.featureFlags).toBeInstanceOf(FeatureFlags);
    expect(client.issue).toBeInstanceOf(Issue);
    expect(client.operations).toBeInstanceOf(Operations);
    expect(client.remoteLinks).toBeInstanceOf(RemoteLinks);
    expect(client.securityInformation).toBeInstanceOf(SecurityInformation);
    expect(client.sprint).toBeInstanceOf(Sprint);
  });
});
