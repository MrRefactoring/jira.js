import { BaseClient } from '../../clients';
import {
  Backlog,
  Board,
  Builds,
  Deployments,
  DevelopmentInformation,
  Epic,
  FeatureFlags,
  Issue,
  Project,
  RemoteLinks,
  Sprint,
} from '..';

export class AgileClient extends BaseClient {
  backlog = new Backlog(this);
  board = new Board(this);
  builds = new Builds(this);
  deployments = new Deployments(this);
  developmentInformation = new DevelopmentInformation(this);
  epic = new Epic(this);
  featureFlags = new FeatureFlags(this);
  issue = new Issue(this);
  project = new Project(this);
  remoteLinks = new RemoteLinks(this);
  sprint = new Sprint(this);
}
