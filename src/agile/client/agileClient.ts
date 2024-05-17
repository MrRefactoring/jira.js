import { BaseClient } from '../../clients';
import {
  Backlog,
  Board,
  Builds,
  Deployments,
  DevelopmentInformation,
  DevopsComponents,
  Epic,
  FeatureFlags,
  Issue,
  Operations,
  RemoteLinks,
  SecurityInformation,
  Sprint,
} from '..';

export class AgileClient extends BaseClient {
  backlog = new Backlog(this);
  board = new Board(this);
  builds = new Builds(this);
  deployments = new Deployments(this);
  developmentInformation = new DevelopmentInformation(this);
  devopsComponents = new DevopsComponents(this);
  epic = new Epic(this);
  featureFlags = new FeatureFlags(this);
  issue = new Issue(this);
  operations = new Operations(this);
  remoteLinks = new RemoteLinks(this);
  securityInformation = new SecurityInformation(this);
  sprint = new Sprint(this);
}
