import { BaseClient } from '@/clients/baseClient.mjs';
import { Customer } from '@/serviceDesk/customer.mjs';
import { Info } from '@/serviceDesk/info.mjs';
import { Insight } from '@/serviceDesk/insight.mjs';
import { KnowledgeBase } from '@/serviceDesk/knowledgeBase.mjs';
import { Organization } from '@/serviceDesk/organization.mjs';
import { Request } from '@/serviceDesk/request.mjs';
import { RequestType } from '@/serviceDesk/requestType.mjs';
import { ServiceDesk } from '@/serviceDesk/serviceDesk.mjs';

export class ServiceDeskClient extends BaseClient {
  customer = new Customer(this);
  info = new Info(this);
  insights = new Insight(this);
  knowledgeBase = new KnowledgeBase(this);
  organization = new Organization(this);
  request = new Request(this);
  requestType = new RequestType(this);
  serviceDesk = new ServiceDesk(this);
}
