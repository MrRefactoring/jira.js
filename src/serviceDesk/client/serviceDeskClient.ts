import { BaseClient } from '../../clients/index.js';
import { Customer } from '../customer.js';
import { Info } from '../info.js';
import { Insight } from '../insight.js';
import { KnowledgeBase } from '../knowledgeBase.js';
import { Organization } from '../organization.js';
import { Request } from '../request.js';
import { RequestType } from '../requestType.js';
import { ServiceDesk } from '../serviceDesk.js';

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
