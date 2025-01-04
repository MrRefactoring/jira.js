import { BaseClient } from '../../clients/baseClient';
import { Customer } from '../customer';
import { Info } from '../info';
import { Insight } from '../insight';
import { KnowledgeBase } from '../knowledgeBase';
import { Organization } from '../organization';
import { Request } from '../request';
import { RequestType } from '../requestType';
import { ServiceDesk } from '../serviceDesk';

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
