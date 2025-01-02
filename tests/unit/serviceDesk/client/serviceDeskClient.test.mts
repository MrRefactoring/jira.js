import { describe, it, expect } from 'vitest';
import { ServiceDeskClient } from '@/serviceDesk/index.mjs';
import { Customer } from '@/serviceDesk/customer.mjs';
import { Info } from '@/serviceDesk/info.mjs';
import { Insight } from '@/serviceDesk/insight.mjs';
import { KnowledgeBase } from '@/serviceDesk/knowledgeBase.mjs';
import { Organization } from '@/serviceDesk/organization.mjs';
import { Request } from '@/serviceDesk/request.mjs';
import { RequestType } from '@/serviceDesk/requestType.mjs';
import { ServiceDesk } from '@/serviceDesk/serviceDesk.mjs';

describe('ServiceDeskClient', () => {
  it('should have all required properties instantiated', () => {
    const client = new ServiceDeskClient({ host: 'http://localhost:3000' });

    // Verify each property exists and is an instance of the correct class
    expect(client.customer).toBeInstanceOf(Customer);
    expect(client.info).toBeInstanceOf(Info);
    expect(client.insights).toBeInstanceOf(Insight);
    expect(client.knowledgeBase).toBeInstanceOf(KnowledgeBase);
    expect(client.organization).toBeInstanceOf(Organization);
    expect(client.request).toBeInstanceOf(Request);
    expect(client.requestType).toBeInstanceOf(RequestType);
    expect(client.serviceDesk).toBeInstanceOf(ServiceDesk);
  });
});
