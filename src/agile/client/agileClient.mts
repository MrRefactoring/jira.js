import { BaseClient } from '@/clients/baseClient.mjs';
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
