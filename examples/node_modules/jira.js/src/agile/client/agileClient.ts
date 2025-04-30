import { BaseClient } from '../../clients/baseClient';
import { Backlog } from '../backlog';
import { Board } from '../board';
import { Builds } from '../builds';
import { Deployments } from '../deployments';
import { DevelopmentInformation } from '../developmentInformation';
import { DevopsComponents } from '../devopsComponents';
import { Epic } from '../epic';
import { FeatureFlags } from '../featureFlags';
import { Issue } from '../issue';
import { Operations } from '../operations';
import { RemoteLinks } from '../remoteLinks';
import { SecurityInformation } from '../securityInformation';
import { Sprint } from '../sprint';

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
